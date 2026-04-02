import { useState } from "react";

export default function Price() {
  const [plan, setPlan] = useState("standard");

  const handleSelect = (value) => {
    setPlan(value);
  };

  return (
    <div className="price-page">

      {/* HEADER */}
      <div className="price-header glass-card">
        <h1>Pricing Plans</h1>
        <p>Choose the best plan for your experience</p>
      </div>

      {/* CARDS */}
      <div className="price-grid">

        {/* BASIC */}
        <div
          className={`price-card glass-card ${plan === "basic" ? "active" : ""}`}
          onClick={() => handleSelect("basic")}
        >
          <h2>Basic</h2>
          <p className="price">$5</p>

          <ul>
            <li>720p Quality</li>
            <li>1 Device</li>
            <li>Ads included</li>
          </ul>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("basic");
              alert("Basic plan selected!");
            }}
          >
            Choose
          </button>
        </div>

        {/* STANDARD */}
        <div
          className={`price-card glass-card ${plan === "standard" ? "active" : ""}`}
          onClick={() => handleSelect("standard")}
        >
          <h2>Standard</h2>
          <p className="price">$10</p>

          <ul>
            <li>1080p Quality</li>
            <li>2 Devices</li>
            <li>No ads</li>
          </ul>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("standard");
              alert("Standard plan selected!");
            }}
          >
            Choose
          </button>
        </div>

        {/* PREMIUM */}
        <div
          className={`price-card glass-card ${plan === "premium" ? "active" : ""}`}
          onClick={() => handleSelect("premium")}
        >
          <h2>Premium</h2>
          <p className="price">$15</p>

          <ul>
            <li>4K Quality</li>
            <li>4 Devices</li>
            <li>Offline download</li>
          </ul>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("premium");
              alert("Premium plan selected!");
            }}
          >
            Choose
          </button>
        </div>

      </div>
    </div>
  );
}