import Link from 'next/link'
import React from 'react'
import LoginLink from './AuthLink';
import { getServerSession } from 'next-auth';
import SessionProvider from './SessionProvider';

const NavBar = async () => {

  const session = await getServerSession();

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">First NextJS App Ni Ozy</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <SessionProvider session={session}>
                <LoginLink />
              </SessionProvider>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar