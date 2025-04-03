'use client'
import Affilaform from '@/components/Affilaform'


export default function SignupPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Affiliate Signup</h1>
                <Affilaform />
            </div>
        </div>
    )
}