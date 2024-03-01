import Image from "next/image";
import Link from "next/link";
import Character from "../character/[characterId]/page";

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
};

type Props = {
  locations: Location[];
};

export default function Locations({ locations }: Props) {
  return (
    <section className="p-6 my-10">
      <div className=" max-w-7xl mx-auto">
        {locations ? (
          <ul className="flex flex-col gap-16">
            {locations.map((location: Location, index: number) => (
              <li key={index} className="">
                <h2 className="text-center mb-2 text-3xl font-semibold">
                  {location.name}
                </h2>
                <p className="text-center mb-8 text-2xl">{location.type}</p>
                <div className="grid grid-cols-5 gap-x-4 gap-y-7">
                  {location.residents.map(
                    (resident: Character, key: number) => (
                      <Link href={`/character/${resident.id}`}>
                        <div key={key} className=" flex flex-col items-center">
                          <Image
                            src={resident.image}
                            alt={resident.name}
                            height={150}
                            width={150}
                            priority
                            className="mb-2"
                          />
                          <p>
                            <span className="text-base font-medium">Name:</span>{" "}
                            {resident.name}
                          </p>
                          <p>
                            <span className="text-base font-medium">
                              Status:
                            </span>{" "}
                            {resident.status}
                          </p>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>Location does not exist</p>
          </>
        )}
      </div>
    </section>
  );
}
