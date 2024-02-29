import Image from "next/image";
import Link from "next/link";
import Character from "../character/[id]/page";
export default function Locations({ locations }) {
  return (
    <div>
      {locations ? (
        <ul>
          {locations.map((location: {}, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[auto,auto,auto] gap-y-40"
            >
              <p>{location.name}</p>
              <p>{location.type}</p>
              <p>
                {location.residents.map((resident: {}, key: number) => (
                  <Link href={`/character/${resident.id}`}>
                    <div key={key} className="grid grid-cols-2">
                      <span>{resident.name}</span>
                      <span>{resident.status}</span>
                      <Image
                        src={resident.image}
                        alt={resident.name}
                        height={70}
                        width={70}
                        priority
                      />
                    </div>
                  </Link>
                ))}
              </p>
            </div>
          ))}
        </ul>
      ) : (
        <>
          <p>Location does not exist</p>
        </>
      )}
    </div>
  );
}
