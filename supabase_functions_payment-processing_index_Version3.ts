import { serve } from "std/server";
import { createClient } from "supabase";

serve(async (req) => {
  const { booking_id, amount, method } = await req.json();
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { global: { headers: { Authorization: `Bearer ${token}` }}});

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

  const { data, error } = await supabase.from("payments").insert([{
    booking_id,
    user_id: user.id,
    amount,
    method,
    status: "pending"
  }]).select().single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify({ status: "processing", payment_id: data.id }), { status: 200 });
});