import jwt from "jsonwebtoken";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyDoctorJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.DOCTOR_ACCESS_TOKEN_SECRET,
    );

    const doctor = await Doctor.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!doctor) {
      throw new ApiError(401, "Invalid Access Token: Doctor not found");
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid or expired doctor access token",
    );
  }
});
