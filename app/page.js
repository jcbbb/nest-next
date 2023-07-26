"use client";
import { useSuspenseQuery } from "@apollo/client";
import { gql } from "@apollo/client"
import Link from "next/link";

const query = gql`query GetEvents {
  events {
    id,
    title,
    description
  }
}`

export default function Home() {
  const { data } = useSuspenseQuery(query);
  return (
    <div className="flex flex-col py-12 space-y-5">
      <h1 className="text-2xl font-semibold text-gray-900 leading-6">Events</h1>
      <div className="flex">
        <section className="max-w-xs w-full">
          <ul>
            {data.events.map((event, i) => (
              <li key={i}>
                <Link href={`/events/${event.id}`} className="block p-2 hover:bg-slate-200 duration-200 rounded-md overflow-hidden">
                  <span className="block font-medium">{event.title}</span>
                  <p className="text-gray-500 text-sm">{event.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
