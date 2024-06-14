import express from "express";
import bodyParser from "body-parser";
import routes from "./app/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware untuk akses .env
dotenv.config();

// Middleware untuk membaca request json
app.use(bodyParser.json());

// Middleware untuk parse cookie
app.use(cookieParser());

const corsOption = {
  // origin: "https://indekos.art",
  origin: "http://127.0.0.1:5500",
  credentials: true,
};

// Middleware CORS
app.use(cors(corsOption));

// Routes
app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
