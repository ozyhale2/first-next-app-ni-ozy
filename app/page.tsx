import LoginButton from './components/LoginButton'
import { getServerSession } from 'next-auth'
import SessionProvider from './components/navBar/SessionProvider';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession();

  console.log('--------------');
  console.log('CURRENT USER: ');
  console.log(session?.user);
  console.log('--------------');

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {session?.user ? (
              <>
                <h1 className="text-5xl font-bold">Hello {session.user.name}</h1>
                <p className="py-6">{process.env.description}</p>
                <Link className="btn btn-primary" href="admin/linkinbio">Get Started</Link>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">{process.env.description}</p>
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
