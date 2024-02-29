"use client";

import Locations from "./Locations";
import SearchLocation from "./SearchLocation";
import { useEffect, useState } from "react";

export default function Home() {
  const [location, setlocation] = useState([]);

  useEffect(() => {
    const getlocation = async () => {
      const res = await fetch("/api/locations");
      const location = await res.json();
      setlocation(location);
      console.log(location);
    };

    getlocation();
  }, []);

  const updateLocation = (results) => {
    setlocation(results);
  };

  return (
    <>
      <SearchLocation getSearchResults={updateLocation} />

      <Locations locations={location} />

      <h1>Home Page</h1>
    </>
  );
}
