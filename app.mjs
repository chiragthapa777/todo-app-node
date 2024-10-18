import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./database/connect.mjs";
import todoRoutes from "./routes/todoRoutes.mjs";
import httpLogger from "./middlewares/httpLogger.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

if (ENV !== "production") {
  app.use(httpLogger);
}

connectDB();

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
