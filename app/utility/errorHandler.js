import fs from "fs";

// === Create Error Function ===
const CreateError = (mes, status) => {
  const error = new Error(mes);
  error.status = status;
  return error;
};

// === Not Found Error Function ===
export const NotFoundError = (req, res, next) => {
  const URL = req.originalUrl;
  const error = CreateError(`Your Requested Url (${URL}) Not Found`, 404);
  next(error);
};

// === Default Error Handler Function ===
export const DefaultError = (err, req, res, next) => {
  const message = err.message ? err.message : "An Error Ocurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
    stack: err.stack,
  });

  // create error log file
  const logger = fs.createWriteStream("error.log", { flags: "a" });
  const logMsg = err.message + " || " + new Date() + "\n";
  logger.write(logMsg);
};
