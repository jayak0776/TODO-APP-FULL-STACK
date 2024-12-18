import express from "express";
import { PORT, mongoURL } from "./config.js";
import cors from "cors";
import mongoose from "mongoose";
import router from "./todoRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to ToDo App!");
});

app.use("/tasks", router);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Database Connected...");
    app.listen(PORT, () => {
      console.log("Server is running on port:" + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
