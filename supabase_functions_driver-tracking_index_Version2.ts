import { serve } from "std/server";
import { createClient } from "supabase";

serve(async (req) => {
  const { latitude, longitude, heading, speed_kmh, booking_id } = await req.json();
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { global: { headers: { Authorization: `Bearer ${token}` }}});

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

  await supabase.from("drivers").update({
    location: `SRID=4326;POINT(${longitude} ${latitude})`,
    last_active: new Date().toISOString()
  }).eq('user_id', user.id);

  return new Response(JSON.stringify({ status: "updated" }), { status: 200 });
});