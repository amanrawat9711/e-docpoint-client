import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = [
    "",
    "JAN",
    "FEB",
    "MARCH",
    "APRIL",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initPay = async (order) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      console.error("Failed to load Razorpay script");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      modal: {
        // Force modal instead of new page
        backdropclose: false,
        confirm_close: true,
        escape: true,
      },
      handler: async (response) => {
        console.log("Payment Successful:", response);
        try {
          const { data } = await axios.post(
            backendUrl + `/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointment();
            navigate("/my-appointments");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);
  return (
    <div>
      <p className="mt-8 font-medium text-gray-600 pb-3">My Appointments</p>
      <div>
        {appointments.map((items, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 mt-10 "
            key={index}
          >
            <div>
              <img className="w-40 bg-indigo-100 " src={items.docData.image} />
            </div>
            <div className="flex-1 text-sm flex-col">
              <p className="text-gray-800 font-semibold">
                {items.docData.name}
              </p>
              <p>{items.docData.speciality}</p>
              <p className="text-gray-900 font-medium mt-4">Address:</p>
              <p className="text-sm">{items.docData.address.line1}</p>
              <p className="text-xs">{items.docData.address.line2}</p>
              <p className="text-xs mt-4">
                {" "}
                <span className="text-sm text-gray-900">Date & Time:</span>{" "}
                {slotDateFormat(items.slotDate)} | {items.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex justify-end flex-col gap-2">
            {items.isCompleted && (
    <button className="border text-md sm:min-w-48 py-2 px-2.5 text-green-500 rounded-md ">Appointment Completed</button>
  )}
              {!items.cancelled && items.payment && !items.isCompleted && (
                <button className="border text-sm sm:min-w-48 py-2 px-2.5 text-stone-500 rounded-md bg-indigo-50">
                  Paid{" "}
                </button>
              )}
              {!items.cancelled && !items.payment && !items.isCompleted && (
                <button
                  className="border rounded-md py-2 text-sm text-center sm:min-w-48 hover:bg-indigo-500 hover:text-white cursor-pointer transition-all duration-300"
                  onClick={() => paymentRazorpay(items._id)}
                >
                  Pay Here
                </button>
              )}

              {!items.cancelled && !items.isCompleted && (
                <button
                  className="border border-b rounded-md py-2 px-4 text-sm text-center sm:min-w-48 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300"
                  onClick={() => cancelAppointment(items._id)}
                >
                  Cancel Appointment
                </button>
              )}
              {items.cancelled && !items.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
