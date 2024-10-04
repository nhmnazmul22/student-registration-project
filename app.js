// === External Imports ===
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import xss from "xss-clean";

// === Internal Imports ===
import {
  DATABASE_URI,
  MAX_JSON_FILE,
  PORT,
  REQUEST_LIMIT,
  REQUEST_TIME,
} from "./app/config/config.js";
import { DefaultError, NotFoundError } from "./app/utility/errorHandler.js";

// === Initial Express app ===
const app = express();
const limit = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_LIMIT });

// === Use Default Middlewares ===
app.use(express.json({ max: MAX_JSON_FILE }));
app.use(express.urlencoded({ max: MAX_JSON_FILE }));

app.use(cookieParser());
app.use(cors());
app.use(ExpressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(limit);


// === Database Connection ===
mongoose
  .connect(DATABASE_URI, { autoIndex: true })
  .then(() => console.log("Database Connection Successful"))
  .catch(() => console.log("Database Connection Failed"));

// === Not Found Error Handler ===
app.use(NotFoundError);

// === Default Error Handler ===
app.use(DefaultError);

// === Server Listen ===
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT} Port.`);
});
