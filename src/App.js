import React, { useState } from "react";

export default function App() {
  const [eventType, setEventType] = useState("marriage");
  const [customEvent, setCustomEvent] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askBot = async () => {
    setLoading(true);
    setResponse("");
    try {
      const event = eventType === "other" ? customEvent : eventType;
      const res = await fetch("https://good-day-fullstack-2.onrender.com/check_day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, date: date || "today" }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("Error contacting the bot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">🪔 Good Day - Auspicious Day Advisor</h1>
        <label className="block font-medium">Select Event</label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full border p-3 rounded-lg"
        >
          <option value="marriage">Marriage</option>
          <option value="buy car">Buy a Car</option>
          <option value="griha pravesh">Griha Pravesh</option>
          <option value="start new project">Start New Project</option>
          <option value="baby naming">Baby Naming</option>
          <option value="other">Other (Type manually below)</option>
        </select>
        {eventType === "other" && (
          <input
            type="text"
            placeholder="Enter custom event"
            value={customEvent}
            onChange={(e) => setCustomEvent(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        )}
        <label className="block font-medium">Choose Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
        <button
          onClick={askBot}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 w-full"
        >
          Ask Astrologer
        </button>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <p className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">{response}</p>
        )}
      </div>
    </div>
  );
}
