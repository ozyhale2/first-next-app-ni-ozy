/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
        title: 'First NextJS App Ni Ozy',
        description: 'Welcome to my first ever nextjs application. In this application, I will create a link in bio tool'
    }
}

module.exports = nextConfig
