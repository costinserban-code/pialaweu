"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const calculate = () => {
    const fv = 5000 * ((Math.pow(1.05, 30) - 1) / 0.05);
    setResult(Math.round(fv));
  };

  const handleDonate = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div style={{ background: "#0a1f44", color: "white", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ color: "yellow" }}>
        A Stronger Europe Starts with Financial Independence
      </h1>

      <p>
        Invest 10% of your income. Build €500,000 in 30 years. Strengthen Europe.
      </p>

      <button onClick={handleDonate} style={{ margin: "20px", padding: "10px", background: "yellow" }}>
        Support (Donate)
      </button>

      <div>
        <h2>Calculator</h2>
        <button onClick={calculate}>Calculate</button>
        {result && <p>€{result.toLocaleString()}</p>}
      </div>
    </div>
  );
}