import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../db/cloudinary.js";
import { user as User } from "../models/user.model.js";
import validator from "validator";

const genAccessandRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong generating refresh and access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, gender, dob, address } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are compulsory");
  }
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Please enter a valid email address");
  }
  if (!validator.isLength(password, { min: 8 })) {
    throw new ApiError(400, "Password must be atleast 8 characters long");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const imageLocalPath = req.file?.path || req.files?.image?.[0]?.path;
  let imageUrl;
  if (imageLocalPath) {
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (uploadedImage?.url) {
      imageUrl = uploadedImage.url;
    }
  }

  const userData = {
    name,
    email,
    password,
  };
  if (imageUrl) userData.image = imageUrl;
  if (phone) userData.phone = phone;
  if (gender) userData.gender = gender;
  if (dob) userData.dob = dob;
  if (address) userData.address = address;

  const user = await User.create(userData);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  if (!name && !email) {
    throw new ApiError(400, "name or email is required");
  }

  const user = await User.findOne({
    $or: [{ name }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User doesnot exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  const { accessToken, refreshToken } = await genAccessandRefreshTokens(
    user._id,
  );
  const loggedInUser = await User.findById(user._id).select(
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
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid access Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken: newRefreshToken } = await genAccessandRefreshTokens(
      user._id,
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser,refreshAccessToken };
