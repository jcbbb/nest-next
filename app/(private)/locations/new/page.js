"use client";

import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation"

const CREATE_LOCATION = gql`mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(createLocationInput: $input) {
    id
  }
}`

export default function NewLocation() {
  const router = useRouter();
  const [createLocation, { loading }] = useMutation(CREATE_LOCATION, {
    refetchQueries: ["GetLocations"],
    onCompleted: () => router.push("/locations")
  })

  function onNewLocation(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    createLocation({ variables: { input: data } });
  }

  return (
    <div className="max-w-md p-4 bg-white rounded-md">
      <h2 className="text-xl font-semibold text-gray-900 leading-6">New location</h2>
      <form onSubmit={onNewLocation} className="space-y-4 mt-6 group">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <input disabled={loading} id="name" name="name" placeholder="Home, sweet home" type="text" autoComplete="off" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
          <div className="mt-2">
            <input disabled={loading} id="address" name="address" placeholder="Wall street, 2nd Avenue, 100000" type="text" autoComplete="off" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:opacity-70 disabled:pointer-events-none" />
          </div>
        </div>
        <div>
          <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none">
            <span className="group-disabled:hidden">
              Create location
            </span>
            <span className="hidden group-disabled:inline">
              Creating location...
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
