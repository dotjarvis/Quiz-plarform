import { NextResponse } from "next/server";

const LOCATION_SOURCE_URL = "https://rickandmortyapi.com/api/location";

export async function fetchCharacter(request: string) {
  try {
    const res = await fetch(`${request}`);
    const character = await res.json();

    console.log(character);

    return character;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchLocation() {
  const res = await fetch(LOCATION_SOURCE_URL);
  const data = await res.json();

  const locations = data.results.map(async (location) => {
    const residents = await Promise.all(
      location.residents.slice(0, 4).map(async (residentUrl) => {
        const residentResponse = await fetch(residentUrl);
        const residentData = await residentResponse.json();

        return {
          id: residentData.id,
          name: residentData.name,
          status: residentData.status,
        };
      })
    );

    return {
      name: location.name,
      type: location.type,
      residents,
    };
  });

  const response = await Promise.all(locations);
  return response;
}

export async function GET() {
  const res = await fetchLocation();

  return NextResponse.json(res);
}
