// === EXTERNAL IMPORTS ===
import mongoose from "mongoose";

// === DEFINE DATA SCHEMA ===
const DataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    roll: {
      type: Number,
      unique: true,
      require: true,
    },
    class: {
      type: String,
      require: true,
    },
    session: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// === DEFINE STUDENT MODEL ===
const StudentModel = mongoose.model("students", DataSchema);

// === EXPORT MODEL ===
export default StudentModel;
