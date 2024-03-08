import "dotenv/config";
import express from "express";
import morgan from "morgan";
import router from "./src/routes/index";
import databaseConnect from "./src/services/database";

const app = express();

databaseConnect();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "TP WebServices API !" });
});

app.use("/", router);

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

export default app;
