import { supabase } from '@/lib/supabase';

export async function bookRide({
  pickup_address, pickup_coordinates, destination_address, destination_coordinates, pickup_time, passenger_count, vehicle_type
}: {
  pickup_address: string, pickup_coordinates: { lat: number, lng: number },
  destination_address: string, destination_coordinates: { lat: number, lng: number },
  pickup_time: string, passenger_count: number, vehicle_type: string
}) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('Not authenticated');

  const res = await fetch('/functions/v1/ride-booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.data.session?.access_token}`,
    },
    body: JSON.stringify({
      service_type: 'ride',
      pickup_address,
      pickup_coordinates,
      destination_address,
      destination_coordinates,
      pickup_time,
      passenger_count,
      vehicle_type,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}