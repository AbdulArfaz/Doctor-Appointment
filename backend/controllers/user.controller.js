import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../db/cloudinary.js";
import { User } from "../models/user.model.js";
import validator from "validator";
import fs from "fs";
import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";
import razorpay from 'razorpay';
import crypto from 'crypto';

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
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  const { accessToken, refreshToken } = await genAccessandRefreshTokens(
    user._id,
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
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
      returnDocument: 'after',
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
    const { accessToken, refreshToken: newRefreshToken } =
      await genAccessandRefreshTokens(user._id);

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

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || { line1: "", line2: "" },
      gender: user.gender || "Male",
      dob: user.dob || "",
      image: user.image || "",
    },
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  let { name, phone, address, gender, dob } = req.body;
  const imageFile = req.file;

  if (typeof address === "string") {
    try {
      address = JSON.parse(address);
    } catch (e) {}
  }

  const updateData = { name, phone, address, gender, dob };

  if (imageFile) {
    const imageUpload = await uploadOnCloudinary(imageFile.path);
    console.log("upload cloud url:", imageUpload.secure_url);
    if (imageUpload) {
      updateData.image = imageUpload.url || imageUpload.secure_url;
    }

    if (fs.existsSync(imageFile.path)) {
      fs.unlinkSync(imageFile.path);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: updateData,
    },
    { returnDocument: 'after'},
  ).select("-password -refreshToken");

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});


export const bookAppointment = asyncHandler(async (req,res)=>{
  const userId = req.user?._id ;
  const {docId,slotDate,slotTime} = req.body;

  const docData = await Doctor.findById(docId).select("-password");
  if (!docData) {
    throw new ApiError(404,'Doctor not found')
  }
  if (!docData.available) {
    throw new ApiError(400, "doctor is not available right now");
  }

  let slots_booked = docData.slots_booked || {};
  
  if (slots_booked[slotDate]) {
      if(slots_booked[slotDate].includes(slotTime)){
          throw new ApiError(400, "slots not available")
      }else{
        slots_booked[slotDate].push(slotTime)
      }
  }else {
    slots_booked[slotDate] = []
    slots_booked[slotDate].push(slotTime)
  }

  const userData = await User.findById(userId).select("-password")
  if (!userData) {
    throw new ApiError(404,'User not found')
  }

  const doctorObj=docData.toObject()
  delete docData.slots_booked

  const userObj = userData.toObject()

  const appointmentData = {
    userId,
    docId,
    userData,
    docData:doctorObj,
    amount:docData.fees,
    slotTime,
    slotDate,
    date : Date.now()
  }

  const newAppointment = new Appointment(appointmentData)
  await newAppointment.save()

  
  await Doctor.findByIdAndUpdate(
    docId,
    {slots_booked},
     {returnDocument: 'after'},
  )

  return res.status(200)
  .json({
    success:true,
    message:'Appointment Booked'
  })

}) 


export const myAppointments = asyncHandler (async (req,res)=>{
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400,'User ID is required to fetch appointments')
  }
  const appointments = await Appointment.find({userId})

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      appointments,
      'User appointments fetched Successfully'
    )
  )
})

export const cancelAppointment = asyncHandler(async(req,res)=>{
  const userId = req.user?._id || req.userId;
  const { appointmentId } = req.body;
  
  if (!appointmentId) {
    throw new ApiError(400, 'Appointment ID is required')
  }

  const appointmentData = await Appointment.findById(appointmentId)
  if (!appointmentData) {
    throw new ApiError(404,'Appointment record not found in DataBase')
  }

  if (appointmentData.userId.toString() !== userId.toString()) {
    throw new ApiError(404, "Appointment not found or unauthorized access")
  }
  await Appointment.findByIdAndUpdate(appointmentId, {cancelled: true})

  const {docId, slotDate, slotTime} = appointmentData
  const doctorData = await Doctor.findById(docId);

  if (doctorData) {
        let slots_booked = doctorData.slots_booked || {};


        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(
                (time) => time.trim().toLowerCase() !== slotTime.trim().toLowerCase()
            );
            doctorData.slots_booked = slots_booked;
            doctorData.markModified('slots_booked');
            await doctorData.save();
        } else {
            console.log(" Date key not found in doctor's slots_booked!");
        }
    }

  return res.status(200)
  .json(
    new ApiResponse(200, {},"Appointment Cancelled Successfully")
  )
})


const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
  })


export const paymentRazorpay = asyncHandler(async(req,res)=>{
  
const { appointmentId } = req.body;
if (!appointmentId) {
  throw new ApiError(400, "Appointment Id is required")
}

const appointmentData = await Appointment.findById(appointmentId)
if (!appointmentData || appointmentData.cancelled) {
  throw new ApiError(404,'Appointment not found or already cancelled')
}

const options = {
  amount: Math.abs(Number(appointmentData.amount)) * 100,
  currency: process.env.CURRENCY || 'INR',
  receipt: appointmentId.toString(),
}

const order = await razorpayInstance.orders.create(options)
return res.status(200)
.json(new ApiResponse(200, order,'Razorpay order created Successfully'))
})


export const verifyRazorpay = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !appointmentId) {
        throw new ApiError(400, "Missing payment details for verification");
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    
    if (expectedSignature !== razorpay_signature) {
        throw new ApiError(400, "Payment verification failed. Invalid signature.");
    }

    
    await Appointment.findByIdAndUpdate(appointmentId, { payment: true });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Payment verified successfully"));
});



export { registerUser, loginUser, logoutUser, refreshAccessToken };
