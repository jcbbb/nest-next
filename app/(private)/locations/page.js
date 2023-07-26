"use client";
import { useSuspenseQuery } from "@apollo/client";
import { gql } from "@apollo/client"
import Link from "next/link";
import { useParams } from "next/navigation";

export const GET_LOCATIONS = gql`query GetLocations {
  locations {
    id,
    name,
    address
  }
}`

export default function Locations() {
  const { data } = useSuspenseQuery(GET_LOCATIONS);
  const params = useParams();
  return (
    <div className="w-full shrink-0 bg-white p-4 rounded-md">
      {data.locations.length ? (
        <ul>
          {data.locations.map((location, i) => (
            <li key={i}>
              <Link href={`/locations/${location.id}`} className={`block p-2 ${location.id == params.id ? "bg-slate-100" : "hover:bg-slate-100"} duration-200 rounded-md overflow-hidden`}>
                <p><span className="font-medium">{location.name}</span> - <span className="text-gray-500 text-sm">{location.address}</span></p>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p className="text-gray-600 text-sm">No locations.</p>}
    </div>
  )
}

