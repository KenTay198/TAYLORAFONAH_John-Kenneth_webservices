import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/routes/index";
import databaseConnect from "./src/config/database";
import cors from "cors";
import { connectRedis } from "./src/config/redis";

const app = express();

databaseConnect();
connectRedis();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.ORIGIN!],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.json({ message: "TP WebServices API !" });
});

app.use("/", router);

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

export default app;
