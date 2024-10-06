import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// === INTERNAL IMPORTS ===
import { upload } from "../utility/fileUploadeUtitlity.js";

// === Define _dirname for ES6 module
const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

// === UPLOAD FILE SERVICE ===
export const UploadFileService = async (req, res) => {
  try {
    upload(req, res, function (error) {
      if (error) {
        res.json({ status: "Failed", message: error.toString() });
      } else {
        res.json({ status: "Success", message: "File uploaded successfully" });
      }
    });
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};

// === GET UPLOADED FILE SERVICE ===
export const GetFileService = async (req) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirName, "../../uploads", fileName);
    return filePath;
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};

// === DELETE UPLOADED FILE SERVICE ===
export const DeleteFileService = async (req) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirName, "../../uploads", fileName);

    // Unlink the file
    await fs.unlink(filePath);
    return { status: "Success", message: "File Delete Successful" };
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};
