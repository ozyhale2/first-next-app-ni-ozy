import Link from 'next/link'
import LoginButton from './components/LoginButton'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/navBar/SessionProvider';

export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Welcome to my first ever nextjs application. In this application, I will create a `link in bio`</p>
            <SessionProvider session={session}>
              <LoginButton />
            </SessionProvider>
          </div>
        </div>
      </div>
    </>
  )
}
