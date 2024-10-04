// === Internal Imports ===
import { DecodedToken } from "../utility/tokenUtility.js";

// === Middleware to check JWT ===
export const AuthVerify = (req, res, next) => {
  const token = req.cookies["Token"];
  const decoded = DecodedToken(token);

  if (decoded === null) {
    return res.status(401).json({ status: "Failed", message: "Unauthorize" });
  } else {
    const { id, email } = decoded;
    req.headers.id = id;
    req.headers.email = email;
    next();
  }
};
