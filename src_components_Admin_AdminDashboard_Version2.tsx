import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("bookings").select("*").then(({ data }) => setBookings(data || []));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>User</th><th>Service</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user_id}</td>
              <td>{b.service_type}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}