'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmbedForm() {
    const searchParams = useSearchParams()
    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            utm_source: searchParams.get('utm_source') || '',
            utm_medium: searchParams.get('utm_medium') || '',
            utm_campaign: searchParams.get('utm_campaign') || '',
        }))
    }, [searchParams])
    const affiliateId = searchParams.get('affiliate') || 'unknown'
    const buttonColor = searchParams.get('button_color') || '#000000'
    const formTitle = searchParams.get('form_title') || 'Request a Transport Quote'
    const utm_source = searchParams.get('utm_source') || ''
    const utm_medium = searchParams.get('utm_medium') || ''
    const utm_campaign = searchParams.get('utm_campaign') || ''

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        manufacturer: '',
        model: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: ''
    })

    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value, }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const res = await fetch('https://affiliate-tracking.onrender.com/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form, affiliate_id: affiliateId,
                }),
            })

            if (res.ok) {
                setSubmitted(true)
            } else {
                const data = await res.json()
                setError(data.error || 'Submission failed')
            }
        } catch (err) {
            setError('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                style={{ backgroundColor: buttonColor }}
                onClick={() => setOpen(true)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                {formTitle}
            </button>

            <AnimatePresence>
                {open && (
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
                                onClick={() => {
                                    setOpen(false)
                                    setSubmitted(false)
                                    setForm({
                                        name: '',
                                        email: '',
                                        phone: '',
                                        year: '',
                                        manufacturer: '',
                                        model: '',
                                        utm_source: '',
                                        utm_medium: '',
                                        utm_campaign: ''
                                    })
                                }}
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                            >
                                ✕
                            </button>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center space-y-2"
                                >
                                    <h2 className="text-2xl font-semibold">Thank you!</h2>
                                    <p className="text-gray-700">
                                        Your transport quote request has been submitted.
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Someone will contact you shortly with a personalized quote.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                                    <h2 className="text-xl text-center font-bold">{formTitle}</h2>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-600"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        {['year', 'manufacturer', 'model', 'name', 'email', 'phone'].map((field) => (
                                            <input
                                                key={field}
                                                type="text"
                                                required
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                className="w-full border p-2 rounded"
                                                value={form[field as keyof typeof form]} // Use proper typing
                                                onChange={(e) => handleChange(field, e.target.value)}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        style={{ backgroundColor: buttonColor }}
                                        className="text-white px-4 py-2 rounded hover:opacity-90"
                                    >
                                        {loading ? (
                                            <motion.div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                            />
                                        ) : (
                                            'Submit Request'
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}