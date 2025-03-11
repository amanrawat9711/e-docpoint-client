import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, token, getDoctorsData, backendUrl } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date and index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(24, 0, 0, 0);

      // sethours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
            if(isSlotAvailable){
              timeSlots.push({
                dateTime: new Date(currentDate),
                time: formattedTime,
              });
            }

        // increment time by 30 minute

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please Login To Book An Appointment");
      return navigate("/");
    }
    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendUrl + `/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="mt-10">
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              style={{ backgroundColor: "#5f6FFF" }}
              className=" w-full  sm:mx-0 sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 rounded-lg p-8 py-7 bg-white mx-2 mt-[-80px] sm:mt-0  border border-gray-500 ">
            <p className="flex gap-2 text-xl text-gray-800 font-medium">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="border rounded-full py-0.5 p-2 text-xs">
                {docInfo.experience}
              </button>
            </div>
            {/* doctor about */}
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} />{" "}
              </p>
              <p className="mt-1 text-sm text-gray-600 max-w-[700px]">
                {docInfo.about}
              </p>
            </div>
            <p className="mt-4 gap-2 font-medium">
              Appointment Fee :{" "}
              <span className="text-gray-700">${docInfo.fees}</span>
            </p>
          </div>
        </div>
        {/* booking slot */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-500">
          <p>Booking Slots</p>
          <div className="flex gap-4 mt-4 items-center overflow-x-scroll">
            {docSlots.length > 0 &&
              docSlots.map((items, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 rounded-full cursor-pointer min-w-16 ${
                    slotIndex === index
                      ? "bg-indigo-500 text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{items[0] && daysOfWeek[items[0].dateTime.getDay()]}</p>
                  <p>{items[0] && items[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className=" flex items-center w-full overflow-x-scroll gap-3 mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((items, index) => (
                <p
                  className={`text-sm font-light flex-sink-0 px-5 py-2 rounded-full border cursor-pointer ${
                    items.time === slotTime
                      ? `bg-indigo-500 text-white`
                      : `text-gray-400 border-gray-300`
                  } `}
                  key={index}
                  onClick={() => setSlotTime(items.time)}
                >
                  {items.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            className="bg-indigo-500 text-white rounded-full mt-5 text-sm font-light py-3 px-12 my-6 cursor-pointer"
            onClick={bookAppointment}
          >
            Book an Appointment
          </button>
        </div>
        {/* listing related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
