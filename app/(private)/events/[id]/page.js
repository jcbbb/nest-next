"use client";
import { useSuspenseQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_EVENT, PARTICIPANTS_SUBSCRIPTION } from "../constants";

export default function SingleEvent({ params }) {
  const { data, subscribeToMore } = useSuspenseQuery(GET_EVENT, { variables: { id: Number(params.id) } })

  useEffect(() => {
    subscribeToMore({
      document: PARTICIPANTS_SUBSCRIPTION,
      variables: { id: Number(params.id) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newParticipant = subscriptionData.data.participantAdded;
        return Object.assign({}, prev, {
          event: {
            ...prev.event,
            participants: [newParticipant, ...prev.event.participants]
          }
        })
      }
    })
  }, [params])

  return (
    <div className="bg-white p-4 rounded-md space-y-5">
      <ul className="flex justify-between w-full">
        <li className="p-1.5 rounded-sm flex items-center space-x-2">
          <div className="bg-indigo-50 w-fit p-2.5 text-indigo-600 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-sm block text-gray-700">Start date</span>
            <span className="text-gray-900 font-medium">{new Date(data.event.start_at).toLocaleString("ru")}</span>
          </div>
        </li>
        <li className="p-1.5 rounded-sm flex items-center space-x-2">
          <div className="bg-indigo-50 w-fit p-2.5 text-indigo-600 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-sm block text-gray-700">End date</span>
            <span className="text-gray-900 font-medium">{new Date(data.event.end_at).toLocaleString("ru")}</span>
          </div>
        </li>
        <li className="p-1.5 rounded-sm flex items-center space-x-2">
          <div className="bg-indigo-50 w-fit p-2.5 text-indigo-600 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <div>
            <span className="text-sm block text-gray-700">Participants</span>
            <span className="text-gray-900 font-medium">{data.event.participants.length}</span>
          </div>
        </li>
      </ul>
      {data.event.participants.length ? (
        <table className="w-full overflow-hidden mt-8 rounded-md">
          <thead className="text-left text-gray-600 text-sm">
            <tr>
              <th className="font-medium p-2.5 bg-slate-50">
                ID
              </th>
              <th className="font-medium p-2.5 bg-slate-50">
                Username
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200">
            {data.event.participants.map((participant, i) => (
              <tr key={i}>
                <td className="font-medium p-2.5 text-gray-900">{participant.id}</td>
                <td className="font-medium p-2.5 text-gray-900">{participant.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="text-gray-600 text-sm">No participant registered yet</p>}
    </div>
  )
}
