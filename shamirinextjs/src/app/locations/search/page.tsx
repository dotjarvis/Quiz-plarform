"use client";

import { FormEvent, useState } from "react";

type props = {
  getSearchResults: (locations: []) => void;
};

export default function SearchLocation({ getSearchResults }: props) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/locations/search?query=${query}`);
    const location = await res.json();

    getSearchResults(location);
  };

  return (
    <section className="p-6">
      <div className="mx-auto">
        <form onSubmit={handleSubmit} className="text-center">
          <input
            className="border p-2 text-base rounded-xl border-black mr-4"
            type="text"
            placeholder="Search location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}
