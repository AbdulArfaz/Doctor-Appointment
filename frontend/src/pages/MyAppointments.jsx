import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/MyAppointments.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendurl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}`, token },
      });

      if (data.success) {
        const reverseAppointments = [...data.data].reverse();
        setAppointments(reverseAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Cancel Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const initPay = (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Doctor Appointment Fee",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendurl}/api/user/verify-razorpay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId,
            },
            { headers: { token } },
          );

          if (data.statusCode === 200) {
            toast.success("Payment Successful!");
            getUserAppointments();
            getDoctorsData();
          }
        } catch (error) {
          console.error("Verification Error:", error);
          toast.error(
            error.response?.data?.message || "Payment verification failed",
          );
        }
      },
      theme: {
        color: "#5f6FFF",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } },
      );
      if (data.statusCode === 200) {
        initPay(data.data, appointmentId);
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to initiate payment",
      );
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="appointments">
      <h2>My Appointments</h2>
      <div className="card-list">
        {appointments.map((item, index) => (
          <div key={index} className="card">
            <img src={item.docData.image} alt="" />

            <div className="info">
              <h3>{item.docData.name}</h3>
              <p className="speciality">{item.docData.speciality}</p>
              <p className="address">
                <strong>Address:</strong>
                <br />
                {item.docData.address.line1}
                <br />
                {item.docData.address.line2}
              </p>
              <p className="date">
                <strong>Date & Time:</strong> {dateFormat(item.slotDate)} |{" "}
                {item.slotTime}
              </p>
            </div>

            <div className="actions">
              {!item.cancelled && item.payment && !item.isCompleted &&  (
                <button className="btn-primary">Paid</button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted &&  (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="btn-primary"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted &&  (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="btn-outline"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted &&  (
                <button className="btn-primary">Appointment Cancelled</button>
              )}

              {
                item.isCompleted && <button className="btn-primary-green">Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
