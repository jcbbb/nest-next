"use client"
import { useMutation } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { useRouter } from "next/navigation"
import { toDatetimeLocal } from "@/utils/date";
import { DELETE_EVENT, GET_LOCATIONS, UPDATE_EVENT } from "../../constants";

const GET_EVENT = gql`query GetEvent($id: Int!) {
  event(id: $id) {
    title,
    description,
    start_at,
    end_at,
    location {
      id
    }
  }
}`

export default function EditEvent({ params }) {
  const router = useRouter();
  const { data } = useSuspenseQuery(GET_EVENT, { variables: { id: Number(params.id) } })
  const { data: locData } = useSuspenseQuery(GET_LOCATIONS)
  const [updateEvent, { loading: updating }] = useMutation(UPDATE_EVENT, {
    onCompleted: () => router.push("/events")
  })

  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT, {
    update(cache, { data: { removeEvent } }) {
      cache.modify({
        fields: {
          events(existingEvents = [], { readField }) {
            return existingEvents.filter(item => removeEvent.id !== readField("id", item))
          }
        }
      })
    },
    onCompleted: () => router.push("/events")
  })

  const loading = updating || deleting;

  function onSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (e.nativeEvent.submitter.name) formData[e.nativeEvent.submitter.name] = e.nativeEvent.submitter.value;
    const { _action, ...data } = formData;
    switch (_action) {
      case "update":
        updateEvent({ variables: { input: Object.assign(data, { id: Number(data.id), location_id: Number(data.location_id) }) } })
        break;
      case "delete":
        deleteEvent({ variables: { id: Number(data.id) } })
        break;
      default:
        break
    }
  }

  return (
    <div className="bg-white p-4 rounded-md">
      <h2 className="text-xl font-semibold text-gray-900 leading-6">Edit {data.event.title}</h2>
      <form onSubmit={onSubmit} className="mt-6 group grid grid-cols-3 gap-4">
        <input type="hidden" name="id" value={params.id} />
        <div className="col-span-3">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="mt-2">
            <input defaultValue={data.event.title} disabled={loading} id="title" name="title" placeholder="JS Conference" type="text" autoComplete="off" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div className="col-span-3">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div className="mt-2">
            <input defaultValue={data.event.description} disabled={loading} id="description" name="description" placeholder="Learn about JS and have fun" autoComplete="off" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
          <div className="mt-2">
            <select disabled={loading} name="location_id" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none">
              <option disabled>Select location</option>
              {locData.locations.map((location, i) => (
                <option value={location.id} selected={location.id === data.event.location} key={i}>{location.name} - {location.address}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="start_at" className="block text-sm font-medium leading-6 text-gray-900">Start at</label>
          <div className="mt-2">
            <input defaultValue={toDatetimeLocal(new Date(data.event.start_at))} disabled={loading} id="start_at" name="start_at" placeholder="Learn about JS and have fun" type="datetime-local" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="end_at" className="block text-sm font-medium leading-6 text-gray-900">End at</label>
          <div className="mt-2">
            <input defaultValue={toDatetimeLocal(new Date(data.event.end_at))} disabled={loading} id="end_at" name="end_at" placeholder="Learn about JS and have fun" type="datetime-local" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div className="flex space-x-4 col-span-2">
          <button name="_action" value="delete" disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold leading-6 text-red-600 shadow-sm hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Delete event
            </span>
            <span className="hidden group-disabled:inline">
              Deleting event...
            </span>
          </button>
          <button name="_action" value="update" disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Update event
            </span>
            <span className="hidden group-disabled:inline">
              Update event...
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
