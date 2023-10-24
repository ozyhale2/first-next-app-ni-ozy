'use client'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import DismissButton from './DismissButton'

type AlertProps = {
    message: string | undefined,
    token: string | undefined
}

const Alert = (props: AlertProps) => {
    const searchParams = useSearchParams()
    const token = searchParams?.get('_fmt')
    const pathname = usePathname()

    return (
        <>
            {props.message && props.token && props.token === token ? (
                <div className='container m-4 mb-8'>
                    <div className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{props.message}</span>
                        <DismissButton pathname={pathname} />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Alert