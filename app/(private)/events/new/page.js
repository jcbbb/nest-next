"use client"

import { useMutation } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { useRouter } from "next/navigation"
import { fromDatetimeLocal } from "@/utils/date";

const GET_LOCATIONS = gql`query GetLocations {
  locations {
    name,
    id,
    address
  }
}`

const CREATE_EVENT = gql`mutation CreateEvent($input: CreateEventInput!) {
  createEvent(createEventInput: $input) {
    id,
    title,
    description
  }
}`

export default function NewEvent() {
  const router = useRouter();
  const { data } = useSuspenseQuery(GET_LOCATIONS)
  const [createEvent, { loading }] = useMutation(CREATE_EVENT, {
    update(cache, { data: { createEvent } }) {
      cache.modify({
        fields: {
          events(existingEvents = [], { toReference }) {
            return [...existingEvents, toReference(createEvent)]
          }
        }
      })
    },
    onCompleted: () => router.push("/events")
  })

  function onNewEvent(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    createEvent({
      variables: {
        input: Object.assign(data, {
          location_id: parseInt(data.location_id, 10),
          start_at: new Date(data.start_at).toISOString(),
          end_at: new Date(data.end_at).toISOString()
        })
      }
    }
    )
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <h2 className="text-xl font-semibold text-gray-900 leading-6">New event</h2>
      <form onSubmit={onNewEvent} className="mt-6 group grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="mt-2">
            <input disabled={loading} id="title" name="title" placeholder="JS Conference" type="text" autoComplete="off" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div className="col-span-3">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div className="mt-2">
            <input disabled={loading} id="description" name="description" placeholder="Learn about JS and have fun" autoComplete="off" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
          <div className="mt-2">
            <select disabled={loading} name="location_id" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none">
              <option selected disabled>Select location</option>
              {data.locations.map((location, i) => (
                <option value={location.id} key={i}>{location.name} - {location.address}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="start_at" className="block text-sm font-medium leading-6 text-gray-900">Start at</label>
          <div className="mt-2">
            <input disabled={loading} id="start_at" name="start_at" placeholder="Learn about JS and have fun" type="datetime-local" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="end_at" className="block text-sm font-medium leading-6 text-gray-900">End at</label>
          <div className="mt-2">
            <input disabled={loading} id="end_at" name="end_at" placeholder="Learn about JS and have fun" type="datetime-local" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Create event
            </span>
            <span className="hidden group-disabled:inline">
              Creating event...
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
