"use client";

import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { fetchCharacter } from "./api/locations/route";

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
      <div>
        <ul>
          {locations.map((location: {}, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[auto,auto,auto] gap-y-40"
            >
              <p>{location.name}</p>
              <p>{location.type}</p>
              <p>
                {location.residents.map((resident: {}, key: number) => (
                  <div key={key} className="grid grid-cols-2">
                    {/* <span> {resident.id}</span> */}
                    <span>{resident.name}</span>
                    <span>{resident.status}</span>
                  </div>
                ))}
              </p>
            </div>
          ))}
        </ul>
      </div>
      <h1>Wokring</h1>
    </div>
  );
}
