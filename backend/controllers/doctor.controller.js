import { asyncHandler } from "../utils/asyncHandler.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    const accessToken = doctor.generateAccessToken();
    const refreshToken = doctor.generateRefreshToken();

    doctor.refreshToken = refreshToken;
    await doctor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong generating refresh and access tokens for doctor",
    );
  }
};

const changeAvailability = asyncHandler(async (req, res) => {
  const { docId } = req.body;
  const docData = await Doctor.findById(docId);
  if (!docData) {
    throw new ApiError(404, "Doctor not found");
  }
  const updateDocAvail = await Doctor.findByIdAndUpdate(
    docId,
    { available: !docData.available },
    { returnDocument: "after" },
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateDocAvail,
        "Avaialablility changed successfully",
      ),
    );
});

const doctorsAll = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({}).select("-password -email");
  if (!doctors) {
    throw new ApiError(400, "Doctors data not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "get all doctors successfully"));
});

const doctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

 const doctor = await Doctor.findOne({
    $or: [{ email }],
  });
  if (!doctor) {
    throw new ApiError(404, "Doctor does not exist");
  }

  const isPasswordValid = await doctor.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid doctor Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    doctor._id,
  );
  const loggedInDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          doctor: loggedInDoctor,
          accessToken,
          refreshToken,
        },
        "Doctor logged in Successfully",
      ),
    );
});

export { changeAvailability, doctorsAll, doctorLogin };
