// === EXTERNAL IMPORTS ===
import express from "express";

// === INTERNAL IMPORTS ===
import * as FileController from "../app/controller/FileController.js";
import * as StudentController from "../app/controller/StudentController.js";
import { AuthVerify } from "../app/middleware/AuthMiddleware.js";

// === INITIAL EXPRESS ROUTE ===
const router = express.Router();

// === STUDENTS ROUTES ===
router.post("/registration", StudentController.Registration);
router.post("/login", StudentController.Login);
router.post("/logout", StudentController.Logout);
router.get("/profile", AuthVerify, StudentController.Profile);
router.post("/update-profile", AuthVerify, StudentController.UpdateProfile);

// === FILE UPLOAD-GET-DELETE ROUTES ===
router.post("/upload-file", FileController.UploadFile);
router.get("/get-file/:fileName", FileController.GetFile);
router.post("/delete-file/:fileName", FileController.DeleteFile);

// === EXPORT ROUTER ===
export default router;
