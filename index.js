import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./connection/db.js";
import router from "./router/router.js";

dotenv.config();
db();
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
const PORT = 3000;
app.listen(PORT, () => {
  console.log("index.js listening on port", PORT);
});

app.get("/", (req, res) => {
  res.send("<h1>e-cart server running successfully</h1>");
});
