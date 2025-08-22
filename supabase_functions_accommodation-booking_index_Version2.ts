import { serve } from "std/server";
import { createClient } from "supabase";

serve(async (req) => {
  const { accommodation_id, guest_name, room_type, check_in, check_out, guest_count } = await req.json();
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { global: { headers: { Authorization: `Bearer ${token}` }}});

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

  const { data, error } = await supabase.from("bookings").insert([{
    user_id: user.id,
    service_type: "accommodation",
    status: "pending",
    passenger_count: guest_count,
    meta: { accommodation_id, guest_name, room_type, check_in, check_out },
    created_at: new Date().toISOString()
  }]).select().single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
});