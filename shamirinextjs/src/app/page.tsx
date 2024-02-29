"use client";

import Locations from "./locations/page";
import SearchLocation from "./locations/search/page";

import { useEffect, useState } from "react";

export default function Home() {
  const [locations, setlocation] = useState([]);

  useEffect(() => {
    const getlocation = async () => {
      const res = await fetch("/api/locations");
      const location = await res.json();
      console.log(location);
      setlocation(location);
    };

    getlocation();
  }, []);

  const updateLocation = (results) => {
    setlocation(results);
  };

  return (
    <>
      {/* <Character /> */}
      <SearchLocation getSearchResults={updateLocation} />

      <Locations locations={locations} />

      <h1>Home Page</h1>
    </>
  );
}
