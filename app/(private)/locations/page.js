"use client";
import { useSuspenseQuery } from "@apollo/client";
import { gql } from "@apollo/client"
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { cache } from "@/lib/apollo-provider";
import { useSocket } from "@/context/socket-context";
import Link from "next/link";

export const GET_LOCATIONS = gql`query GetLocations {
  locations {
    id,
    name,
    address,
    status
  }
}`

const statuses = {
  "processing": "bg-yellow-50 text-yellow-700",
  "active": "bg-green-50 text-green-700"
}

export default function Locations() {
  const { data } = useSuspenseQuery(GET_LOCATIONS);
  const params = useParams();
  const { socket } = useSocket();

  function onLocationCreated(location) {
    cache.updateQuery({ query: GET_LOCATIONS }, (data) => ({
      locations: [...data.locations, location]
    }))
  }

  function onLocationRemoved(id) {
    cache.updateQuery({ query: GET_LOCATIONS }, (data) => ({
      locations: data.locations.filter((loc) => loc.id !== id)
    }))
  }

  function onLocationUpdated(location) {
    cache.updateQuery({ query: GET_LOCATIONS }, (data) => ({
      locations: data.locations.map(loc => loc.id === location.id ? { ...loc, ...location } : loc)
    }))
  }

  useEffect(() => {
    socket.emit("subscribe", ["locations"]);
    socket.on("locationCreated", onLocationCreated)
    socket.on("locationRemoved", onLocationRemoved)
    socket.on("locationUpdated", onLocationUpdated)

    return () => {
      socket.emit("unsubscribe", ["locations"])
      socket.off("locationCreated", onLocationCreated);;
    }
  }, [])

  return (
    <div className="w-full shrink-0 bg-white p-4 rounded-md">
      {data.locations.length ? (
        <ul>
          {data.locations.map((location, i) => (
            <li key={i}>
              <Link href={`/locations/${location.id}`} className={`block p-2 ${location.id == params.id ? "bg-slate-100" : "hover:bg-slate-100"} duration-200 rounded-md overflow-hidden flex items-center justify-between`}>
                <p>
                  <span className="font-medium">{location.name}</span> - <span className="text-gray-500 text-sm">{location.address}</span>
                </p>
                <span className={`${statuses[location.status]} inline-flex items-center rounded-md p-1 text-sm font-medium ring-1 ring-inset ring-red-600/10`}>{location.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p className="text-gray-600 text-sm">No locations.</p>}
    </div>
  )
}

