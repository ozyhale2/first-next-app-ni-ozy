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
          <Link href="/" className="btn btn-ghost normal-case text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </Link>
          <Link href="/admin/linkinbio" className="btn btn-ghost normal-case">Link in Bio Tool</Link>
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