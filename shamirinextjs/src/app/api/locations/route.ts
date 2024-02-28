import { NextResponse } from "next/server";

const LOCATION_SOURCE_URL = "https://rickandmortyapi.com/api/location";

// async function fetchLocation() {
//   try {
//     const res = await fetch(LOCATION_SOURCE_URL);
//     const locations = await res.json();
//     return locations.results;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function fetchCharacter(request: string) {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${request}`
    );
    const character = await res.json();

    return character;
  } catch (error) {
    console.error(error);
  }
}

export async function GET() {
  const res = await fetch("https://rickandmortyapi.com/api/location");
  const locations = await res.json();

  return NextResponse.json(locations.results);
}
