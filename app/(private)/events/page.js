"use client";
import { useSuspenseQuery } from "@apollo/client";
import Link from "next/link";
import { GET_EVENTS, GET_LOCATIONS } from "./constants";

export default function Events() {
  const { data, refetch } = useSuspenseQuery(GET_EVENTS, { variables: { input: {} } });
  const { data: locData } = useSuspenseQuery(GET_LOCATIONS)

  function onFilter(e) {
    const form = e.target.form;
    const data = Object.fromEntries(new FormData(form));
    refetch({ input: Object.assign(data, { location_id: Number(data.location_id) }) })
  }

  return (
    <div className="w-full shrink-0 bg-white p-4 rounded-md space-y-5">
      <div>
        <form className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">By location</label>
            <div className="mt-2">
              <select onChange={onFilter} name="location_id" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none">
                <option selected disabled>Select location</option>
                {locData.locations.map((location, i) => (
                  <option value={location.id} key={i}>{location.name} - {location.address}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="start_at" className="block text-sm font-medium leading-6 text-gray-900">Start at</label>
            <div className="mt-2">
              <input onChange={onFilter} id="start_at" name="start_at" type="datetime-local" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="end_at" className="block text-sm font-medium leading-6 text-gray-900">End at</label>
            <div className="mt-2">
              <input onChange={onFilter} id="end_at" name="end_at" type="datetime-local" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
            </div>
          </div>
        </form>
      </div>
      {data.events.length ? (
        <ul className="mt-6">
          {data.events.map((event, i) => (
            <li key={i} className="flex items-center group hover:bg-slate-100 rounded-md overflow-hidden duration-200 group">
              <Link href={`/events/${event.id}`} className={`block w-full p-2`}>
                <span className="block font-medium">{event.title}</span>
                <p className="text-gray-500 text-sm">{event.description}</p>
              </Link>
              <Link href={`/events/${event.id}/edit`} className="p-2 hover:bg-slate-300 duration-200 rounded-md inline-block mr-2 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p className="text-gray-600 text-sm">No events</p>}
    </div>
  )
}
