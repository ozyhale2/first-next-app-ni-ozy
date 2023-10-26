import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/navBar/NavBar'
import { FlashMessage } from './components/flashMessage/FlashMessage'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.title,
  description: process.env.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
