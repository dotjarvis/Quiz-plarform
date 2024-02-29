import { NextResponse } from "next/server";
import { fetchLocation } from "../route";

export async function GET(request: Request) {
  const location = await fetchLocation();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const filteredLocation = location.filter((loc) => {
    return (
      loc.name.toLowerCase().includes(query?.toLowerCase()) ||
      loc.residents.some((resident: any) =>
        resident.name.toLowerCase().includes(query?.toLowerCase())
      )
    );
  });

  return NextResponse.json(filteredLocation);
}
