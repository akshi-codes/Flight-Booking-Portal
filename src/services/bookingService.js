import axios from "axios";

const API_URL = "http://localhost:8080/bookings";

export const createBooking = (bookingData) => {
  return axios.post(API_URL, bookingData);
};
