import { useEffect, useState } from 'react';
import './FlightInstanceList.css';
import { getAllFlightInstances } from '../services/flightInstanceService';

export default function FlightInstanceList({ onSelectFlightInstance, selectedId }) {
    const [flightInstances, setFlightInstances] = useState([]);

    //filter states
    const [searchFlightId, setSearchFlightId] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

     //Fetches all the airports using getAllFlightInstances()
    useEffect(() => {
        getAllFlightInstances()
        .then((res) => {
            setFlightInstances(res.data || []);
        })
        .catch((err) => {
            console.error("Error fetching flightInstances:", err);
            setFlightInstances([]);
        });
    }, []);

   // Filtering logic
    const filteredInstances = flightInstances.filter((fi) => {
        const matchFlightId = fi.flightId.toString().includes(searchFlightId);
        const matchDate = searchDate ? fi.departureDate === searchDate : true;
        const matchStatus = fi.status.toLowerCase().includes(searchStatus.toLowerCase());
        return matchFlightId && matchDate && matchStatus;
    });

    return (
        <div className="flex items-center justify-center p-6 py-20">
            <div className="w-full max-w-5xl">
            <h2 className="text-4xl font-bold mb-6">Select a flight</h2>

            <div className="flex gap-4 mb-4 justify-end">
            <input
                type="text"
                className="input input-bordered input-sm bg-none"
                placeholder="Flight ID"
                value={searchFlightId}
                onChange={(e) => setSearchFlightId(e.target.value)}
            />
            <input
                type="date"
                className="input input-bordered input-sm"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
            />
            <input
                type="text"
                className="input input-bordered input-sm bg-none"
                placeholder="Status"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
            />
            </div>

            <div
            className="overflow-x-auto rounded-box border border-white/20
                        bg-gradient-to-br from-white/1 to-white/5
                        backdrop-blur-xs shadow-2xl
                        ring-1 ring-white/10"
            >
            <table className="table w-full">
                <thead className="text-white">
                    <tr>
                        <th></th>
                        <th>Flight ID</th>
                        <th>Departure Date</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                {filteredInstances.map((fi) => {
                    const isSelected = String(fi.id) === String(selectedId);
                    return (
                    <tr
                        key={fi.id}
                        className={`cursor-pointer ${isSelected ? 'bg-cyan-200' : 'hover:bg-gray-600'}`}
                        onClick={() => typeof onSelectFlightInstance === 'function' && onSelectFlightInstance(fi.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectFlightInstance(fi.id)}
                    >
                        <td>{fi.id}</td>
                        <td>{fi.flightId}</td>
                        <td>{fi.departureDate}</td>
                        <td>{fi.departureTime.replace("T", " ")}</td>
                        <td>{fi.arrivalTime.replace("T", " ")}</td>
                        <td className="font-semibold">{fi.status}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

            {filteredInstances.length === 0 && (
            <p className="text-center mt-4 text-gray-400">No flight instances match your search.</p>
            )}
            </div>
        </div>
    );
}
