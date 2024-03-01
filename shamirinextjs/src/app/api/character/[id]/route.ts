import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await res.json();

  if (!character.id)
    return NextResponse.json({ message: "Character not found" });

  return NextResponse.json(character);
}
