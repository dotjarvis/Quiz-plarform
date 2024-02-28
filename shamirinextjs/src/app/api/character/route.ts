import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const locations = await res.json();

  return NextResponse.json(locations.results);
}
