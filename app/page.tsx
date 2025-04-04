'use client'
import Affilaform from '@/components/Affilaform'
import logo from '@/public/logo.png'

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" w-full p-6 bg-white rounded shadow">
        <div className="flex justify-center mb-4">
          <img src={logo.src} alt="Logo" className="h-full w-auto" />
        </div>
        <Affilaform />
      </div>
    </div>
  )
}