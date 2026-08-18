import { asyncHandler } from "../utils/asyncHandler.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from '../models/appointment.model.js'

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

const doctorAppointments = asyncHandler(async(req,res)=>{

const docId  = req.doctor?._id;
if (!docId) {
  throw new ApiError(400, 'Doctor reference missing from request')
}
const appointments = await Appointment.find({docId})
return res
.status(200)
.json(new ApiResponse(200, appointments, 'Appointments retrieved successfully'))
})

const appointmentComplete = asyncHandler(async(req,res)=>{
  const { appointmentId } =req.body;
  const docId = req.doctor?._id;
 
  const appointmentData =await Appointment.findById(appointmentId)
  if (!appointmentData || String(appointmentData.docId) !== String(docId)) {
    return res.status(400)
    .json(new ApiResponse(400, 'Invalid appointment or unauthorized doctor access'))
  }

   await Appointment.findByIdAndUpdate(appointmentId, {isCompleted: true})

  return res
  .status(200)
  .json(new ApiResponse(200,{},'Appointment completed successfully'))
})


const appointmentCancel = asyncHandler(async(req,res)=>{
  
  const { appointmentId } =req.body;
  const docId = req.doctor?._id;

  const appointmentData =await Appointment.findById(appointmentId)
  if (!appointmentData || String(appointmentData.docId) !== String(docId)) {
    return res.status(400)
    .json(new ApiResponse(400, 'Invalid appointment or unauthorized doctor access'))
  }

   await Appointment.findByIdAndUpdate(appointmentId, {cancelled: true})

   const { slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(docId);

    if (doctorData) {
        let slots_booked = doctorData.slots_booked || {};

        if (slots_booked[slotDate] && Array.isArray(slots_booked[slotDate]) && slotTime) {
            const targetTime = String(slotTime).trim().toLowerCase();

            slots_booked[slotDate] = slots_booked[slotDate].filter((time) => {
                return time && String(time).trim().toLowerCase() !== targetTime;
            });

            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate];
            }
          
            doctorData.slots_booked = slots_booked;
            doctorData.markModified('slots_booked'); 
            await doctorData.save();
        }
    }

  return res
  .status(200)
  .json(new ApiResponse(200,{ success : true},'Appointment cancelled successfully'))
})

const doctorDashboard = asyncHandler(async (req, res) => {
    const docId = req.doctor?._id;
    const appointments = await Appointment.find({ docId });

    let earnings = 0;
    const patientSet = new Set();

    appointments.forEach((item) => {
        if (item.isCompleted || item.payment) {
            earnings += item.amount;
        }
        if (item.userId) {
            patientSet.add(item.userId.toString());
        }
    });

    const dashData = {
        earnings,
        appointments: appointments.length,
        patients: patientSet.size,
        latestAppointments: [...appointments].reverse().slice(0, 5)
    };

    return res
        .status(200)
        .json(new ApiResponse(200, dashData, 'Dashboard data fetched successfully'));
});

export { changeAvailability,
        doctorsAll,
        doctorLogin,
        doctorAppointments,
        appointmentComplete,
        appointmentCancel,
        doctorDashboard };
