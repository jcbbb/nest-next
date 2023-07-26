"use client";
import { useSuspenseQuery } from "@apollo/client";
import { gql } from "@apollo/client"
import Link from "next/link";
import { useParams } from "next/navigation";

const GET_EVENTS = gql`query GetEvents {
  events {
    id,
    title,
    description
  }
}`

export default function EventsLayout({ children }) {
  const { data } = useSuspenseQuery(GET_EVENTS);
  const params = useParams();

  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 leading-6">Events</h1>
        <Link className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none" href="/events/new">Create event</Link>
      </div>
      <div className="flex space-x-8 bg-white p-4 rounded-md h-[calc(100vh-16rem)]">
        <section className="max-w-xs w-full shrink-0">
          {data.events.length ? (
            <ul className="overflow-y-scroll max-h-full">
              {data.events.map((event, i) => (
                <li key={i}>
                  <Link href={`/events/${event.id}`} className={`block p-2 ${event.id == params.id ? "bg-slate-100" : "hover:bg-slate-100"} duration-200 rounded-md overflow-hidden`}>
                    <span className="block font-medium">{event.title}</span>
                    <p className="text-gray-500 text-sm">{event.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-600 text-sm">No events</p>}
        </section>
        <section className="w-full">{children}</section>
      </div>
    </div>
  )
}

