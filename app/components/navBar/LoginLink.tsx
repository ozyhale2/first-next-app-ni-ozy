'use client'
import React from 'react'
import { signIn, useSession } from 'next-auth/react'

const LoginLink = () => {
    return (
        <button onClick={() => signIn()}>Login</button>
    )
}

export default LoginLink