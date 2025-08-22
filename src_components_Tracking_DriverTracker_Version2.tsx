import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function DriverTracker({ bookingId }: { bookingId: string }) {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

  useEffect(() => {
    const channel = supabase.channel(`booking_${bookingId}`)
      .on('broadcast', { event: 'driver_location_update' }, (payload) => {
        setLocation(payload.data);
      }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [bookingId]);

  return (
    <div>
      {location ? (
        <div>
          Driver at {location.lat}, {location.lng}
        </div>
      ) : (
        <div>Waiting for driver...</div>
      )}
    </div>
  );
}