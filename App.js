import React, { useState } from "react";
import "./App.css";

function App() {
  const [eventType, setEventType] = useState("marriage");
  const [customEvent, setCustomEvent] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    setLoading(true);
    setResponse("");
    const event = eventType === "other" ? customEvent : eventType;
    try {
      const res = await fetch("https://good-day-1.onrender.com/check_day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, date: date || "today" }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (e) {
      setResponse("❌ Failed to fetch from bot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🪔 Good Day - Auspicious Day Advisor</h1>
      <label>Event</label>
      <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
        <option value="marriage">Marriage</option>
        <option value="buy car">Buy Car</option>
        <option value="start project">Start Project</option>
        <option value="baby naming">Baby Naming</option>
        <option value="other">Other (Type Below)</option>
      </select>
      {eventType === "other" && (
        <input
          type="text"
          placeholder="Custom event"
          value={customEvent}
          onChange={(e) => setCustomEvent(e.target.value)}
        />
      )}
      <label>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={askBot}>Ask Bot</button>
      <div>{loading ? "Loading..." : response}</div>
    </div>
  );
}

export default App;
