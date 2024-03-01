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
    <section className="p-6 my-10">
      <div className=" max-w-7xl mx-auto flex items-center justify-center">
        {character ? (
          <div className="">
            <Image
              src={character.image}
              alt={character.name}
              height={240}
              width={240}
              priority
              className="mb-8"
            />
            <p className="text-xl mb-2">
              {" "}
              <span className="capitalize font-medium">name:</span>{" "}
              {character.name}
            </p>
            <p className="text-xl mb-2">
              {" "}
              <span className="capitalize font-medium">status:</span>{" "}
              {character.status}
            </p>
            <p className="text-xl mb-2">
              {" "}
              <span className="capitalize font-medium">species:</span>{" "}
              {character.species}
            </p>
            <p className="text-xl mb-2">
              {" "}
              <span className="capitalize font-medium">location:</span>{" "}
              {character.location?.name ?? "Unknown"}
            </p>
            <p className="text-xl mb-2">
              {" "}
              <span className="capitalize font-medium">gender:</span>{" "}
              {character.gender}
            </p>
            <p className="text-xl mb-2">
              {" "}
              <span className="capitalize font-medium">origin:</span>{" "}
              {character.origin?.name ?? "Unknown"}
            </p>
          </div>
        ) : (
          <div>
            <p>Loading</p>
          </div>
        )}
      </div>
    </section>
  );
}
