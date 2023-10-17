import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'First NextJS App Ni Ozy',
  description: 'Welcome to my first ever nextjs application. In this application, I will create a `link in bio`',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-300">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">First NextJS App Ni Ozy</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
