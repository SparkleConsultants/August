import { serve } from "std/server";
import { createClient } from "supabase";

serve(async (req) => {
  const { flight_id, passenger_name, passenger_email, travel_date, passengers_count } = await req.json();
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { global: { headers: { Authorization: `Bearer ${token}` }}});

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

  const { data, error } = await supabase.from("bookings").insert([{
    user_id: user.id,
    service_type: "flight",
    status: "pending",
    passenger_count: passengers_count,
    pickup_address: "", pickup_coordinates: null,
    destination_address: "", destination_coordinates: null,
    pickup_time: travel_date,
    vehicle_type: null,
    fare: null,
    payment_status: "unpaid",
    created_at: new Date().toISOString(),
    meta: { flight_id, passenger_name, passenger_email }
  }]).select().single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
});