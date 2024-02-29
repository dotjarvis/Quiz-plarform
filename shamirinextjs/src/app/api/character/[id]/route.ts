import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  console.log("id");
  console.log("id");
  console.log("id");
  console.log(id);
  console.log(request.url);

  console.log("id");
  console.log("id");

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  console.log(res);

  const character = await res.json();
  console.log(character);

  if (!character.id)
    return NextResponse.json({ message: "Character not found" });

  return NextResponse.json(character);
}
