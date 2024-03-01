import { NextResponse } from "next/server";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  note: string;
};

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await res.json();

  if (!character.id)
    return NextResponse.json({ message: "Character not found" });

  return NextResponse.json(character);
}

export async function PUT(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const { note, status }: Partial<Character> = await request.json();

  if (!id) return NextResponse.json({ message: "Character not found" });
  if (!note || !status)
    return NextResponse.json({ message: "Please add your notes" });

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      note,
      status,
    }),
  });

  const updatedCharacter: Character = await res.json();

  return NextResponse.json({
    message: `Character ${id} updated`,
  });
}
