import LoginButton from './components/LoginButton'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/navBar/SessionProvider';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession();

  console.log(session?.user);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {session?.user ? (
              <>
                <h1 className="text-5xl font-bold">Hello {session.user.name}</h1>
                <p className="py-6">Welcome to my first ever nextjs application. In this application, I will create a `linktree` like application</p>
                <Link className="btn btn-primary" href="/linktree">Get Started</Link>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">Welcome to my first ever nextjs application. In this application, I will create a `linktree` like application</p>
                <SessionProvider session={session}>
                  <LoginButton />
                </SessionProvider>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
