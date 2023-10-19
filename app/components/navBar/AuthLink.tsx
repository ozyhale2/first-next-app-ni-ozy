'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const LoginLink = () => {
    const {data: session} = useSession();
    return (
        <button className={session ? "text-error hover:text-error" : ""} onClick={() => session ? signOut() : signIn()}>
            {session ? "Logout" : "Login"}
        </button>
    )
}

export default LoginLink