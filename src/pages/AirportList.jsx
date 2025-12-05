import { useEffect, useState } from "react";
import { getAllAirports } from "../services/airportService";
import './AirportList.css';
import Navbar from '../components/Navbar';
import homebg from '../assets/home-bg.jpg'

export default function AirportList() {
  const [airports, setAirports] = useState([])

  //Fetches all the airports using getAllAirports()
  useEffect(() => {
    getAllAirports()
      .then((res) => {
        setAirports(res.data);
      })
      .catch((err) => {
        console.error("Error fetching airports:", err)
      })
  }, [])

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
        <div className="min-h-screen flex items-center justify-center bg-none p-6">
            <div className="w-full max-w-4xl">

            <div className="overflow-x-auto rounded-box border border-white/20
                            bg-gradient-to-br from-white/1 to-white/5
                            backdrop-blur-xs shadow-2xl
                            ring-1 ring-white/10">

                <h2 className="text-lg font-semibold p-4">Airports List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Airport Name</th>
                        <th>City</th>
                        <th>Code</th>
                        <th>Country</th>
                    </tr>
                    </thead>
                    <tbody>
                    {airports.map((airport) => (
                        <tr key={airport.id} className="hover:bg-gray-900 cursor-pointer font-semibold">
                        <td>{airport.id}</td>
                        <td>{airport.name}</td>
                        <td>{airport.city}</td>
                        <td>{airport.code}</td>
                        <td>{airport.country}</td>
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
