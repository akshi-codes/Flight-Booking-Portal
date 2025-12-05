import { useEffect, useState } from 'react';
import './FlightInstanceList.css';
import { getAllFlightInstances } from '../services/flightInstanceService';

export default function FlightInstanceList({ onSelectFlightInstance, selectedId }) {
  const [flightInstances, setFlightInstances] = useState([]);

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

  return (
    <div className="flex items-center justify-center p-6 py-20">
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold mb-4">Select a flight</h2>

        <div className="overflow-x-auto rounded-box border border-white/20
                            bg-gradient-to-br from-white/1 to-white/5
                            backdrop-blur-xs shadow-2xl
                            ring-1 ring-white/10">
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
              {flightInstances.map((fi) => {
                const isSelected = String(fi.id) === String(selectedId);
                return (
                  <tr
                    key={fi.id}
                    className={`cursor-pointer ${isSelected ? 'bg-cyan-200' : 'hover:bg-gray-600'}`}
                    onClick={() => {
                      if (typeof onSelectFlightInstance === 'function') {
                        onSelectFlightInstance(fi.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (typeof onSelectFlightInstance === 'function') onSelectFlightInstance(fi.id);
                      }
                    }}
                  >
                    <td>{fi.id}</td>
                    <td>{fi.flightId}</td>
                    <td>{fi.departureDate}</td>
                    <td>{fi.departureTime.replace("T", " ")}</td>
                    <td>{fi.arrivalTime.replace("T"," ")}</td>
                    <td className="font-semibold">{fi.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {flightInstances.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No flight instances found.</p>
        )}
      </div>
    </div>
  );
}
