import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "https://majestic-moxie-73cf6d.netlify.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
// connect to mongodb
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
