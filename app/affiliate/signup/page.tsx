'use client'

import { useState } from 'react'

export default function AffiliateSignup() {
    const [form, setForm] = useState({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        website: '',
        commission_rate: 0.1,
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('http://localhost:8080/api/affiliates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (res.ok) setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold">Thanks for signing up!</h2>
                <p>We’ll get in touch shortly.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Affiliate Signup</h2>

            {['company_name', 'contact_name', 'email', 'phone', 'website'].map((field) => (
                <input
                    key={field}
                    required
                    className="w-full border p-2 rounded"
                    placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    value={(form as any)[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                />
            ))}

            <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Submit Application
            </button>
        </form>
    )
}
