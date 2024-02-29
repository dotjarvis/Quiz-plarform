"use client";

import { useState } from "react";

type props = {
  getSearchResults: (locations: []) => void;
};

export default function SearchLocation({ getSearchResults }: props) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/locations/search?query=${query}`);
    console.log(res);
    const location = await res.json();
    console.log(location);

    getSearchResults(location);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
