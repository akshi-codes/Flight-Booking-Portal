/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlightAnimation from "../components/FlightAnimation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/users/login", {
      username,
      password,
    })
      .then((res) => {
        setMessage({ type: "success", text: "Login successful!" });

        const user = res.data;

        localStorage.setItem("userID", user.userId);
        localStorage.setItem("username", user.username);

        console.log("Login Response:", res.data);

        setUsername("");
        setPassword("");

        setTimeout(() => {
          navigate("/home");
        }, 1200);
      })
      .catch((err) => {
        setMessage({ type: "error", text: "Invalid username or password" });
      });
  };

  return (
    <>
      <div className="login-wrapper">
      <FlightAnimation />
        <div className="flex flex-col justify-center items-center my-5" style={{ zIndex: 20 }}>
          <h1 className="
            text-[75px] font-extrabold tracking-[8px] uppercase
            text-transparent bg-clip-text font-sans
            bg-gradient-to-r from-orange-600 via-purple-500 via-yellow-300 to-green-300
            bg-[length:300%_300%] animate-[spin_6s_linear_infinite] animate-pulse
            drop-shadow-[0_0_35px_rgba(0,255,255,0.55)]
            ">
            Take <span className='text-orange-300'>अ</span> Flight
        </h1>

        </div>

        <div className="py-10 flex flex-col justify-center">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-sky-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20" style={{ zIndex: 20 }}>

              {message && (
                <div className={`alert mb-4 ${message.type === "success" ? "alert-success" : "alert-error"}`}>
                  {message.text}
                </div>
              )}

              <div className="max-w-md mx-auto">
                <h1 className="text-2xl text-black font-semibold">Login</h1>

                <form className="py-8 space-y-6" onSubmit={handleLogin}>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="username"
                      name="username"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black focus:outline-none"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                      peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-placeholder-shown:text-base
                      peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600">
                      Username
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black focus:outline-none"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                      peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-placeholder-shown:text-base
                      peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600">
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-orange-500 text-white rounded-md px-20 py-2 my-1 w-full hover:bg-orange-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
