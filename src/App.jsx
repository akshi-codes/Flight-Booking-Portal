import { BrowserRouter, Routes, Route } from "react-router-dom";
import AirportList from "./pages/AirportList";
import FlightList from "./pages/FlightList";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/airports" element={<AirportList />} />
        <Route path="/flights" element={<FlightList />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
