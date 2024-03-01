"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location?: { name: string };
  origin?: { name: string };
  image: string;
};

export default function Character({
  params,
}: {
  params: { characterId: string };
}) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const res = await fetch(`/api/character/${params.characterId}`);
        const characterData = await res.json();
        setCharacter(characterData);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    getCharacter();
  }, [params]);

  return (
    <>
      {character ? (
        <div>
          <p>name: {character.name}</p>
          <p>status: {character.status}</p>
          <p>species: {character.species}</p>
          <p>location: {character.location?.name ?? "Unknown"}</p>
          <p>gender: {character.gender}</p>
          <p>origin: {character.origin?.name ?? "Unknown"}</p>
          <Image
            src={character.image}
            alt={character.name}
            height={70}
            width={70}
            priority
          />
        </div>
      ) : (
        <div>
          <p>Loading</p>
        </div>
      )}
    </>
  );
}
