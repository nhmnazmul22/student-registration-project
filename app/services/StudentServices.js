import md5 from "md5";
import { DecodedToken, EncodedToken } from "../utility/tokenUtility.js";

// === INTERNAL IMPORTS ===
import StudentModel from "../model/StudentModel.js";

// === STUDENTS REGISTRATION SERVICES ===
export const RegistrationService = async (req) => {
  try {
    const reqBody = req.body;
    reqBody.password = md5(reqBody.password);

    const data = await StudentModel.aggregate([
      { $match: reqBody },
      { $count: "total" },
    ]);

    // Check if user already exists
    if (data[0]?.total === 1) {
      return { status: "Failed", message: "User already exists" };
    } else {
      const data = await StudentModel.create(reqBody);
      return { status: "Success", data: data };
    }
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};

// === STUDENTS LOGIN SERVICES ===
export const LoginService = async (req, res) => {
  try {
    const reqBody = req.body;
    reqBody.password = md5(reqBody.password);
    const data = await StudentModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 1, email: 1 } },
    ]);

    if (data.length === 1) {
      const token = EncodedToken(data[0]._id, data[0].email);
      // Set Cookie Options
      const options = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("Token", token, options);
      return { status: "Success", message: "Login Successful", token: token };
    } else {
      return { status: "Failed", message: "User not found" };
    }
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};

// === STUDENTS LOGOUT SERVICES ===
export const LogoutService = async (req, res) => {
  try {
    res.clearCookie("Token");
    return { status: "Success", message: "Logout Successful" };
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};

// === STUDENTS PROFILE SERVICES ===
export const ProfileService = async (req) => {
  try {
    const token = req.cookies.Token;
    // Decode the token
    const decoded = DecodedToken(token);

    if (decoded !== null) {
      const { email, id } = decoded;
      const data = await StudentModel.findOne(
        { _id: id, email: email },
        { password: 0 }
      );
      return { status: "Success", data: data };
    } else {
      return { status: "Failed", message: "Unauthorize" };
    }
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};

// === STUDENTS UPDATE PROFILE SERVICES ===
export const UpdateProfileService = async (req, res) => {
  try {
    const reqBody = req.body;
    if (reqBody.password || reqBody.email) {
      return {
        status: "Failed",
        message: "You can't change password or email",
      };
    } else {
      const token = req.cookies.Token;
      // Decode the token
      const decoded = DecodedToken(token);
      if (decoded !== null) {
        const { email, id } = decoded;
        const data = await StudentModel.updateOne(
          { _id: id, email: email },
          { $set: reqBody }
        );
        return { status: "Success", message: "Profile Update Successful" };
      } else {
        return { status: "Failed", message: "Unauthorize" };
      }
    }
  } catch (err) {
    return { status: "Failed", message: err.toString() };
  }
};
