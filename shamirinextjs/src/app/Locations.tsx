export default function Locations({ locations }) {
  if (locations === undefined) {
    return (
      <>
        <p>Location doesnot exist</p>
      </>
    );
  }

  return (
    <div>
      <ul>
        {locations.map((location: {}, index: number) => (
          <div key={index} className="grid grid-cols-[auto,auto,auto] gap-y-40">
            <p>{location.name}</p>
            <p>{location.type}</p>
            <p>
              {location.residents.map((resident: {}, key: number) => (
                <div key={key} className="grid grid-cols-2">
                  <span>{resident.name}</span>
                  <span>{resident.status}</span>
                </div>
              ))}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}
