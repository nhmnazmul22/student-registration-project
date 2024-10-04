// === External Imports ===
import jwt from "jsonwebtoken";
import { JWT_EXPIRED_TIME, JWT_KEY } from "../config/config.js";

// === Token Encoded Function ===
export const EncodedToken = (id, email) => {
  const KEY = JWT_KEY;
  const EXPIRE_TIME = JWT_EXPIRED_TIME;
  const PAYLOAD = { id: id, email: email };
  return jwt.sign(PAYLOAD, KEY, { expiresIn: EXPIRE_TIME });
};

// === Token Decoded Function ===
export const DecodedToken = (token) => {
  try {
    const KEY = JWT_KEY;
    const decoded = jwt.verify(token, KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};
