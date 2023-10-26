'use client'
import React from 'react'

const LinkItem = ({ href, title }: { href: string; title: string }) => {
    return (
        <div onClick={() => {window.open(href, "_tab")}} className="border rounded p-4 transition duration-300 transform hover:scale-105 cursor-pointer">
            {title}
        </div>
    )
}

export default LinkItem