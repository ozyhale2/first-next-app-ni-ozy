import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Welcome to my first ever nextjs application. In this application, I will create a `link in bio`</p>
            <Link href="/login" className="btn btn-primary">Login Here</Link>
          </div>
        </div>
      </div>
    </>
  )
}
