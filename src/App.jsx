import React from "react";
import Dashboard from "./Components/Dashboard"; // match folder name "Components" (capital C)

export default function App() {
  return (
    <div className="container">
      <div className="app-header d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Dashboard Page — Frontend Trainees - Akshat Kumar</h3>
          <small>
            JSON-driven categories & widgets — Redux Toolkit + Bootstrap
          </small>
        </div>
        <div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn btn-outline-secondary"
          >
            Akshat Kumar
          </a>
        </div>
      </div>

      <Dashboard />
    </div>
  );
}
