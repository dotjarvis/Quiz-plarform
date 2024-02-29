// "use client";

// import Image from "next/image";

// import { useEffect, useState } from "react";

// export default function Character({ request }) {
//   const [character, setCharacter] = useState("");

//   useEffect(() => {
//     const getcharacter = async () => {
//       const res = await fetch(`/api/character/${request}`);

//       const character = await res.json();
//       console.log(character);

//       setCharacter(character);
//     };

//     getcharacter();
//   }, [request]);

//   return (
//     <>
//       {character ? (
//         <div>
//           <p>name: {character.name}</p>
//           <p>status: {character.status}</p>
//           <p>species: {character.species}</p>
//           <p>location: {character.location.name}</p>
//           <p>gender: {character.gender}</p>
//           <p>origin: {character.origin.name}</p>
//           <Image
//             src={character.image}
//             alt={character.name}
//             height={70}
//             width={70}
//             priority
//           />
//         </div>
//       ) : (
//         <div>
//           <p>Loading</p>
//         </div>
//       )}
//     </>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Character({ characterId }) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const res = await fetch(`/api/character/${characterId}`);
        const characterData = await res.json();
        setCharacter(characterData);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    getCharacter();
  }, [characterId]);

  return (
    <>
      {character ? (
        <div>
          <p>name: {character.name}</p>
          <p>status: {character.status}</p>
          <p>species: {character.species}</p>
          <p>location: {character.location?.name}</p>
          <p>gender: {character.gender}</p>
          <p>origin: {character.origin?.name}</p>
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
