import express, { Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import authRoute from "./routes/auth";
import usersRoute from "./routes/users";
import productsRoute from "./routes/products";

const app: express.Application = express();

app.use(cors());
app.use((_, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/user", usersRoute);
app.use("/product", productsRoute);

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
//Initializing bucket on open so we can access files in controllers.
export let gfs: any;
db.once("open", () => {
  console.log("mongoooooooo");
  gfs = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "products",
  });
});

export default app;
