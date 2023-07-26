import Link from "next/link";

export default function EventsLayout({ children }) {
  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 leading-6">Locations</h1>
        <Link className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group disabled:opacity-70 disabled:pointer-events-none" href="/locations/new">Create location</Link>
      </div>
      {children}
    </div>
  )
}


