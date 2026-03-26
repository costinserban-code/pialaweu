"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculate = () => {
    const fv = 5000 * ((Math.pow(1.05, 30) - 1) / 0.05);
    setResult(Math.round(fv));
  };

  const handleDonate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout-session", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const data = await res.json();
      if (!data.url) throw new Error("No checkout URL returned");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#0a1f44", color: "white", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ color: "yellow" }}>A Stronger Europe Starts with Financial Independence</h1>
      <p>Invest 10% of your income. Build €500,000 in 30 years. Strengthen Europe.</p>
      {error && <div style={{ color: "red", padding: "10px", background: "rgba(255,0,0,0.1)" }}>{error}</div>}
      <button onClick={handleDonate} disabled={loading}
        style={{ margin: "20px", padding: "10px 20px", background: "yellow", color: "black", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "4px" }}>
        {loading ? "Processing..." : "Support (Donate)"}
      </button>
      <div style={{ marginTop: "40px" }}>
        <h2>Calculator</h2>
        <button onClick={calculate}
          style={{ padding: "10px 20px", background: "yellow", color: "black", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "4px" }}>
          Calculate
        </button>
        {result && <p style={{ fontSize: "24px", color: "yellow", marginTop: "20px" }}>€{result.toLocaleString()}</p>}
      </div>
    </div>
  );
}
