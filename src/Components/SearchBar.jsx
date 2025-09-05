import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  function update(s) {
    setTerm(s);
    onSearch(s);
  }

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search widgets across all categories..."
        value={term}
        onChange={(e) => update(e.target.value)}
      />
      <button
        className="btn btn-outline-secondary"
        onClick={() => {
          setTerm("");
          onSearch("");
        }}
      >
        Clear
      </button>
    </div>
  );
}
