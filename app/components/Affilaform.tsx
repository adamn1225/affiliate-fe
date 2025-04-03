'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Affilaform() {
    const [form, setForm] = useState({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        website: '',
        commission_rate: 0.1,
    })
    const [submitted, setSubmitted] = useState(false)
    const [iframeCode, setIframeCode] = useState<string | null>(null) // State to store iframe code
    const [modalOpen, setModalOpen] = useState(false) // State to control modal visibility

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('https://affiliate-tracking.onrender.com/api/affiliates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (res.ok) {
            const data = await res.json()
            const affiliateId = data.affiliate.id

            // Update iframe with actual deployed embed URL
            const iframeHTML = `<iframe src="https://nextload.vercel.app/embed/form?affiliate=${affiliateId}" width="100%" height="800" style="border:none;" title="Load Request Form"></iframe>`

            setSubmitted(true)
            setIframeCode(iframeHTML)
            setModalOpen(true) // Open the modal
        } else {
            alert('Something went wrong. Try again.')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-center">Affiliate Signup</h2>

                {['company_name', 'contact_name', 'email', 'phone', 'website'].map((field) => (
                    <input
                        key={field}
                        required
                        className="w-full border p-2 rounded"
                        placeholder={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        value={form[field as keyof typeof form]} // Use proper typing
                        onChange={(e) => handleChange(field as keyof typeof form, e.target.value)}
                    />
                ))}

                <div className='flex items-center justify-center w-full'>
                    <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                        Generate Form
                    </button>
                </div>
            </form>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-white p-6 rounded shadow-lg max-w-xl w-full relative"
                        >
                            <button
                                onClick={() => setModalOpen(false)} // Close the modal
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-bold mb-4 text-center">Thanks for signing up!</h2>
                            <p className="text-center mb-4">Copy the embed code below to use the form on your website:</p>

                            {iframeCode && (
                                <textarea
                                    readOnly
                                    className="w-full border p-2 rounded bg-gray-100"
                                    value={iframeCode}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}