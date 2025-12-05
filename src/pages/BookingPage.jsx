/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import './BookingPage.css'
import axios from "axios";
import FlightInstanceList from './FlightInstanceList';
import Navbar from '../components/Navbar';
import homebg from "../assets/home-bg.jpg";

export default function BookingPage() {
  const [flightInstanceId, setFlightInstanceId] = useState("");
  const [userId, setUserId] = useState(() => localStorage.getItem("userID") || "");
  const [passengers, setPassengers] = useState([
    { firstName: "", lastName: "", email: "", phone: "" }
  ]);
  const formRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectFlightInstance = (id) => {
    setFlightInstanceId(id);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { firstName: "", lastName: "", email: "", phone: "" }]);
  };

  const resetForm = () => {
    setFlightInstanceId("");
    setUserId("");
    setPassengers([{ firstName: "", lastName: "", email: "", phone: "" }]);
  };

  const submitBooking = (e) => {
    e.preventDefault();

    const bookingData = {
      flightInstanceId: Number(flightInstanceId),
      userId: Number(userId),
      passengers: passengers
    };

    axios.post("http://localhost:8080/bookings", bookingData)
      .then(res => {
        setSuccessMessage("Your booking has been confirmed!");
        resetForm();
        setTimeout(() => setSuccessMessage(""), 4000);
      })
      .catch(err => {
        console.error("Error booking:", err);
      });
  };

  return (
    <div
        style={{
            backgroundImage: `url(${homebg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            width: "100%",
        }}
    >
      <Navbar />
      <FlightInstanceList onSelectFlightInstance={handleSelectFlightInstance} />
      <div ref={formRef} className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-darkgrey shadow-md p-6 rounded-lg">
          {successMessage && (
            <div role="alert" className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

        <form
        onSubmit={submitBooking}
        className="bg-white-200 p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-black"
        >
        <h2 className="text-xl text-white font-bold mb-4">Book Flight</h2>

        <label className='text-white'>Flight ID:</label>
        <input
            className="input bg-white input-bordered w-full mb-4 text-black"
            value={flightInstanceId}
            onChange={(e) => setFlightInstanceId(e.target.value)}
            required
        />

        <label className='text-white'>User ID:</label>
        <input
            className="input bg-white input-bordered w-full mb-6 text-black"
            value={userId}
            readOnly
        />

        <h3 className="font-semibold mb-2 text-white">Passengers</h3>
        {passengers.map((p, index) => (
            <div
            key={index}
            className="p-4 mb-4 grid grid-cols-2 gap-4 bg-none text-black"
            >
            <input
                className="input bg-white input-bordered text-black"
                placeholder="First Name"
                value={p.firstName}
                onChange={(e) =>
                handlePassengerChange(index, "firstName", e.target.value)
                }
                required
            />
            <input
                className="input bg-white input-bordered text-black"
                placeholder="Last Name"
                value={p.lastName}
                onChange={(e) =>
                handlePassengerChange(index, "lastName", e.target.value)
                }
                required
            />
            <input
                className="input bg-white input-bordered text-black"
                placeholder="Email"
                value={p.email}
                onChange={(e) =>
                handlePassengerChange(index, "email", e.target.value)
                }
                required
            />
            <input
                className="input bg-white input-bordered text-black"
                placeholder="Phone"
                value={p.phone}
                onChange={(e) =>
                handlePassengerChange(index, "phone", e.target.value)
                }
                required
            />
            </div>
        ))}

        <button type="button" className="btn btn-secondary bg-orange-400 text-white mb-4" onClick={addPassenger}>
            + Add Passenger
        </button>

        <button type="submit" className="btn btn-primary bg-orange-500 text-white w-full">
            Submit Booking
        </button>
        </form>

        </div>
      </div>


    </div>
  );
}
