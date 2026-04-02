import { useState } from "react";

export default function About() {
  const [tab, setTab] = useState("about");

  return (
    <div className="about">

      {/* HEADER */}
      <div className="about-header glass-card">
        <h1>About Movie App</h1>
        <p>
          A modern Netflix-style React application with API integration,
          favorites system and custom movie creation.
        </p>
      </div>

      {/* NAV */}
      <div className="about-tabs">
        <button
          className={tab === "about" ? "active" : ""}
          onClick={() => setTab("about")}
        >
          About
        </button>

        <button
          className={tab === "features" ? "active" : ""}
          onClick={() => setTab("features")}
        >
          Features
        </button>

        <button
          className={tab === "stack" ? "active" : ""}
          onClick={() => setTab("stack")}
        >
          Stack
        </button>
      </div>

      {/* CONTENT */}
      <div className="about-content glass-card">

        {tab === "about" && (
          <p>
            This project is a Netflix-inspired movie platform.
            Users can browse movies from API, add their own movies,
            and manage favorites.
          </p>
        )}

        {tab === "features" && (
          <ul>
            <li>✔ Movie API (TMDB)</li>
            <li>✔ Add custom movies</li>
            <li>✔ Favorites system</li>
            <li>✔ Search functionality</li>
          </ul>
        )}

        {tab === "stack" && (
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Context API</li>
            <li>CSS (glass UI)</li>
          </ul>
        )}

      </div>

    </div>
  );
}