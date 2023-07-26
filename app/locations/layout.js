"use client";
import { useSuspenseQuery } from "@apollo/client";
import { gql } from "@apollo/client"
import Link from "next/link";
import { useParams } from "next/navigation";

const GET_LOCATIONS = gql`query GetLocations {
  locations {
    id,
    name
  }
}`

export default function EventsLayout({ children }) {
  const { data } = useSuspenseQuery(GET_LOCATIONS);
  const params = useParams();
  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 leading-6">Locations</h1>
        <Link className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none" href="/locations/new">Create location</Link>
      </div>
      <div className="flex space-x-8 bg-white p-4 rounded-md h-[calc(100vh-16rem)]">
        <section className="max-w-xs w-full shrink-0">
          {data.locations.length ? (
            <ul className="overflow-y-scroll max-h-full">
              {data.locations.map((location, i) => (
                <li key={i}>
                  <Link href={`/locations/${location.id}`} className={`block p-2 ${location.id == params.id ? "bg-slate-100" : "hover:bg-slate-100"} duration-200 rounded-md overflow-hidden`}>
                    <span className="block font-medium">{location.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-600 text-sm">No locations.</p>}
        </section>
        <section className="w-full">{children}</section>
      </div>
    </div>
  )
}


