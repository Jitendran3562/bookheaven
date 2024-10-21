import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";

const app = express();
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://dancing-parfait-073d35.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you are using cookies or sessions
  })
);

app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
// connect to mongodb
try {
  mongoose.connect(URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  console.log("connect to mongodb");
} catch (error) {
  console.log("Error", error);
}

// defining route
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
