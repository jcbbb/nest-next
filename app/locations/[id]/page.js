"use client"

import { useMutation } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { useRouter } from "next/navigation"

const GET_LOCATION = gql`query GetLocation($id: Int!) {
  location(id: $id) {
    id,
    name,
    address
  }
}`

const UPDATE_LOCATION = gql`mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(updateLocationInput: $input) {
    id
  }
}`

const DELETE_LOCATION = gql`mutation RemoveLocation($id: Int!) {
  removeLocation(id: $id) {
    id
  }
}`

export default function SingleLocation({ params }) {
  const router = useRouter();
  const { data } = useSuspenseQuery(GET_LOCATION, { variables: { id: Number(params.id) } })
  const [updateLocation, { loading }] = useMutation(UPDATE_LOCATION, { refetchQueries: ["GetLocations"] })
  const [deleteLocation] = useMutation(DELETE_LOCATION, { refetchQueries: ["GetLocations"] });

  function onSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (e.nativeEvent.submitter.name) formData[e.nativeEvent.submitter.name] = e.nativeEvent.submitter.value;
    const { _action, ...data } = formData;
    switch (_action) {
      case "update":
        updateLocation({ variables: { input: Object.assign(data, { id: Number(data.id) }) } })
        break;
      case "delete":
        deleteLocation({ variables: { id: Number(data.id) } })
        router.push("/locations")
        break;
      default:
        break
    }
  }
  return (
    <div className="max-w-md py-8">
      <h2 className="text-xl font-semibold text-gray-900 leading-6">Edit {data.location.name}</h2>
      <form onSubmit={onSubmit} className="space-y-4 mt-6 group">
        <input type="hidden" name="id" value={data.location.id} />
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <input defaultValue={data.location.name} disabled={loading} id="name" name="name" placeholder="JS Conference" type="text" autoComplete="off" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
          <div className="mt-2">
            <input defaultValue={data.location.address} disabled={loading} id="address" name="address" placeholder="JS Conference" type="text" autoComplete="off" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div className="flex space-x-4">
          <button name="_action" value="delete" disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-semibold leading-6 text-red-600 shadow-sm hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Delete location
            </span>
            <span className="hidden group-disabled:inline">
              Deleting location...
            </span>
          </button>
          <button name="_action" value="update" disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Update location
            </span>
            <span className="hidden group-disabled:inline">
              Updating location...
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
