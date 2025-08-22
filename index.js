import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";

import cors from "cors";
import { RootRoutes } from "./routes/root.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", RootRoutes);

app.get("/", (req, res) => {
  return res.send("Salom, bu Express server!");
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} portda ishlamoqda...`);
});
