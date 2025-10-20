import React, { useState } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function SearchForm({ onSearch }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [minTemp, setMinTemp] = useState(18);
  const [maxTemp, setMaxTemp] = useState(26);

  const submit = (e) => {
    e.preventDefault();
    onSearch({ month, min_temp: Number(minTemp), max_temp: Number(maxTemp) });
  };

  return (
    <form onSubmit={submit}>
      <label>Month</label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m, i) => <option key={i} value={i+1}>{m}</option>)}
      </select>

      <div style={{ marginTop: 8 }}>
        <label>Min temp (°C)</label>
        <input type="number" value={minTemp} onChange={(e) => setMinTemp(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Max temp (°C)</label>
        <input type="number" value={maxTemp} onChange={(e) => setMaxTemp(e.target.value)} />
      </div>

      <button style={{ marginTop: 12 }} type="submit">Search</button>
    </form>
  );
}