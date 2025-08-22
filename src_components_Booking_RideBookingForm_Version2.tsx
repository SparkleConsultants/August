import React, { useState } from "react";
import { bookRide } from "@/api/bookRide";

export function RideBookingForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await bookRide({
        pickup_address: pickup,
        pickup_coordinates: { lat: -9.4647, lng: 147.1593 },
        destination_address: destination,
        destination_coordinates: { lat: -9.4431, lng: 147.2200 },
        pickup_time: new Date().toISOString(),
        passenger_count: 1,
        vehicle_type: "sedan",
      });
      setResult(data);
    } catch (err) {
      alert("Booking failed: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Pickup Location" />
      <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination" />
      <button type="submit" disabled={loading}>Book Ride</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}