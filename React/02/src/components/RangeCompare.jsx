import { useState } from "react";

function RangeCompare() {
  const [value, setValue] = useState(50);
  const [prev, setPrev] = useState(null);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);

    setPrev(value);
    setValue(newValue);
  };

  const diff = prev === null ? 0 : value - prev;

  const getArrow = () => {
    if (diff > 0) return "↑";
    if (diff < 0) return "↓";
    return "";
  };

  return (
    <div className="range-box glass-card">
      <h3>Range comparison</h3>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />

      <div className="range-values">
        <span>Now: {value}</span>

        <span className={`prev-value ${diff > 0 ? "up" : diff < 0 ? "down" : ""}`}>
          Prev: {prev ?? "-"} {getArrow()}
        </span>
      </div>
    </div>
  );
}

export default RangeCompare;