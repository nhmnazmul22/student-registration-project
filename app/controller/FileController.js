// === INTERNAL IMPORTS ===
import {
  DeleteFileService,
  GetFileService,
  UploadFileService,
} from "../services/FileServices.js";

// === UPLOAD FILE CONTROLLER ===
export const UploadFile = async (req, res) => {
  UploadFileService(req, res);
};

// === UPLOADED GET FILE CONTROLLER ===
export const GetFile = async (req, res) => {
  const result = await GetFileService(req);
  res.sendFile(result);
};

// === UPLOADED DELETE FILE CONTROLLER ===
export const DeleteFile = async (req, res) => {
  const result = await DeleteFileService(req);
  res.json(result);
};
