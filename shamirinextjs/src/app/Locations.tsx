"use client";

import { useEffect, useState } from "react";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getlocation = async () => {
      const res = await fetch("/api/locations");
      const locations = await res.json();
      console.log(locations);
      setLocations(locations);
    };

    getlocation();
  }, []);

  return (
    <div>
      {/* <SearchCoins getSearchResults={(results) => setCoins(results)} /> */}
      {/* <Coins coins={coins} /> */}

      <div>
        <ul>
          {locations.map((location: {}, index: number) => (
            <div key={index} className="grid grid-cols-3">
              <p>{location.name}</p>
              <p>{location.type}</p>
              <p>residents {location.residents}</p>
            </div>
          ))}
        </ul>
      </div>
      <h1>Wokring</h1>
    </div>
  );
}
