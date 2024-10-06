// === INTERNAL IMPORTS ===

import {
  LoginService,
  LogoutService,
  ProfileService,
  RegistrationService,
  UpdateProfileService,
} from "../services/StudentServices.js";

// === STUDENTS REGISTRATION CONTROLLER ===
export const Registration = async (req, res) => {
  const result = await RegistrationService(req);
  res.json(result);
};

// === STUDENTS LOGIN CONTROLLER ===
export const Login = async (req, res) => {
  const result = await LoginService(req, res);
  res.json(result);
};

// === STUDENTS LOGOUT CONTROLLER ===
export const Logout = async (req, res) => {
  const result = await LogoutService(req, res);
  res.json(result);
};

// === STUDENTS PROFILE CONTROLLER ===
export const Profile = async (req, res) => {
  const result = await ProfileService(req);
  res.json(result);
};

// === STUDENTS UPDATE PROFILE CONTROLLER ===
export const UpdateProfile = async (req, res) => {
  const result = await UpdateProfileService(req);
  res.json(result);
};
