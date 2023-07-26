import '../globals.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <main className="max-w-6xl mx-auto py-16">
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  )
}
