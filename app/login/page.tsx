'use client'

import { useState } from 'react'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (res.ok) {
            const data = await res.json()
            localStorage.setItem('admin_token', data.token)
            window.location.href = '/admin/dashboard'
        } else {
            const err = await res.json()
            setError(err.error || 'Login failed')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Sign In
                </button>
            </form>
        </div>
    )
}
