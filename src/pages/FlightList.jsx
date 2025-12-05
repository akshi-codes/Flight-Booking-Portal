import { useEffect, useState } from "react";
import { getAllFlights } from "../services/flightService";
import { getAllAirports } from "../services/airportService";   // <-- add this
import Navbar from "../components/Navbar";
import homebg from '../assets/home-bg.jpg'
export default function FlightList() {
      const [flights, setFlights] = useState([]);
      const [airports, setAirports] = useState([]);


        useEffect(() => {
        Promise.all([getAllFlights(), getAllAirports()])
            .then(([flightRes, airportRes]) => {
            setFlights(flightRes.data);
            setAirports(airportRes.data);
            })
            .catch((err) => console.error(err));
        }, []);

        const getAirportName = (id) => {
        const airport = airports.find((a) => a.id === id);
        return airport ? airport.name : "Unknown";
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
            <div className="min-h-screen flex items-center justify-center bg-none">
                <div className="w-full max-w-4xl">
                    <div className="overflow-x-auto rounded-box border          border-white/20
                            bg-gradient-to-br from-white/1 to-white/5
                            backdrop-blur-xs shadow-2xl
                            ring-1 ring-white/10">
                    <h2 className="text-lg font-semibold p-4">Flight List</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Flight Number</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                        </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight) => (
                            <tr key={flight.id} className="hover:bg-gray-900 cursor-pointer font-semibold">
                                <td>{flight.id}</td>
                                <td>{flight.flightNumber}</td>
                                <td>{getAirportName(flight.departureAirportId)}</td>
                                <td>{getAirportName(flight.arrivalAirportId)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
