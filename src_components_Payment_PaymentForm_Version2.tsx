import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export function PaymentForm({ bookingId, amount }: { bookingId: string, amount: number }) {
  const [method, setMethod] = useState("mobile_money");
  const [status, setStatus] = useState<string | null>(null);

  async function handlePayment() {
    const user = await supabase.auth.getUser();
    const res = await fetch("/functions/v1/payment-processing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.data.session?.access_token}`,
      },
      body: JSON.stringify({ booking_id: bookingId, amount, method }),
    });
    const data = await res.json();
    setStatus(data.status);
  }

  return (
    <div>
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option value="mobile_money">Mobile Money</option>
        <option value="credit_card">Credit Card</option>
      </select>
      <button onClick={handlePayment}>Pay Now</button>
      {status && <div>Payment status: {status}</div>}
    </div>
  );
}