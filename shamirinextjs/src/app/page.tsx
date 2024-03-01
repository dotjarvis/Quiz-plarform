"use client";

import Locations from "./locations/page";
import SearchLocation from "./locations/search/page";

import { useEffect, useState } from "react";

export default function Home() {
  const [locations, setlocation] = useState([]);

  useEffect(() => {
    const getlocation = async () => {
      const res = await fetch("/api/locations");
      const locations = await res.json();
      setlocation(locations);
    };

    getlocation();
  }, []);

  const updateLocation = (results: any) => {
    setlocation(results);
  };

  return (
    <>
      <SearchLocation getSearchResults={updateLocation} />
      <Locations locations={locations} />
    </>
  );
}
