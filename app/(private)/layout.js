"use client";

import '../globals.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from "@/lib/apollo-provider";
import Link from 'next/link';
import { gql, useSuspenseQuery } from '@apollo/client';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

const GET_ME = gql`query GetMe {
  me {
    username
  }
}`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <main className="max-w-6xl mx-auto py-16 flex space-x-4">
            <aside className="bg-white p-4 rounded-md max-w-xs w-full shrink-0 h-[calc(100vh-16rem)]">
              <ul>
                <li>
                  <Link href="/events" className={`block p-2.5 hover:bg-slate-100 duration-200 rounded-md overflow-hidden`}>Events</Link>
                </li>
                <li>
                  <Link href="/locations" className={`block p-2.5 hover:bg-slate-100 duration-200 rounded-md overflow-hidden`}>Locations</Link>
                </li>
              </ul>
            </aside>
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  )
}
