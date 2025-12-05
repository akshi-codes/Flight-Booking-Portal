import './HomePage.css'
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom";
import booking from "../assets/booking.png";
import airport from "../assets/airport.png";
import flight from "../assets/flight.png";
import homebg from "../assets/home-bg.jpg"
import { useState, useEffect } from "react";
import { getAllFlights } from "../services/flightService";
import { getAllAirports } from "../services/airportService";

export default function HomePage() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [flights, setFlights] = useState([]);
    const [airports, setAirports] = useState([]);
    const [results, setResults] = useState([]);

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

    const handleSearch = () => {
        const filtered = flights.filter(f =>
            getAirportName(f.departureAirportId).toLowerCase().includes(from.toLowerCase()) &&
            getAirportName(f.arrivalAirportId).toLowerCase().includes(to.toLowerCase())
        );
        setResults(filtered);
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
            <h1 className="flex text-xl mt-16 ml-110 mb-2">Search Flights</h1>
            <div className="flex justify-center gap-4 ml-23">
                <input
                    type="text"
                    placeholder="From"
                    className="input input-bordered border-3"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="To"
                    className="input input-bordered border-3"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="btn btn-primary bg-orange-500 border-none hover:bg-orange-600 text-white shadow-none"
                >
                    Search
                </button>
            </div>
            {results.length > 0 && (
                <div className="flex flex-col items-center mt-10 gap-3 w-full">
                    <h2 className="text-2xl font-bold">Available Flights</h2>
                    <table className="table w-[70%] text-lg">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Flight Number</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((flight, index) => (
                                <tr key={flight.id} className="hover:bg-gray-900 cursor-pointer">
                                    <td>{index + 1}</td>
                                    <td>{flight.flightNumber}</td>
                                    <td>{getAirportName(flight.departureAirportId)}</td>
                                    <td>{getAirportName(flight.arrivalAirportId)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-between items-end w-full px-20 mt-85">
                <Link to="/booking">
                    <div className="hover-3d cursor-pointer">
                        <figure className="w-30 rounded-2xl">
                            <img src={booking} alt="booking" />
                            <h1 className="px-3 text-md">Book Tickets</h1>
                        </figure>
                    </div>
                </Link>
                <div className="flex gap-20">
                    <Link to="/airports">
                        <div className="hover-3d cursor-pointer">
                            <figure className="w-30 rounded-2xl">
                                <img src={airport} alt="airport" />
                                <h1 className="px-8 text-md">Airports</h1>
                            </figure>
                        </div>
                    </Link>
                    <Link to="/flights">
                        <div className="hover-3d cursor-pointer">
                            <figure className="w-30 rounded-2xl">
                                <img src={flight} alt="flight" />
                                <h1 className="px-8 text-md">Flights</h1>
                            </figure>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
