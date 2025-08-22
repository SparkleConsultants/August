import { serve } from "std/server";
import { createClient } from "supabase";

serve(async (req) => {
  const { route_id, passenger_count, travel_date, payment_method } = await req.json();
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { global: { headers: { Authorization: `Bearer ${token}` }}});

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

  const { data, error } = await supabase.from("bookings").insert([{
    user_id: user.id,
    service_type: "pmv",
    status: "pending",
    passenger_count,
    meta: { route_id, payment_method },
    created_at: new Date().toISOString()
  }]).select().single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
});