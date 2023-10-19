'use client'
import React from 'react'
import { signIn, useSession } from 'next-auth/react'

const LoginButton = () => {
    return (
        <button className="btn btn-primary" onClick={() => signIn()}>Login</button>
    )
}

export default LoginButton