'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmbedForm() {
    const searchParams = useSearchParams()
    const affiliateId = searchParams.get('affiliate') || 'unknown'
    const buttonColor = searchParams.get('button_color') || '#000000'
    const formTitle = searchParams.get('form_title') || 'Request a Transport Quote'

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        manufacturer: '',
        model: '',
        origin: '',
        destination: '',
    })

    const [step, setStep] = useState(1) // Track the current step
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
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
                    ...form,
                    affiliate_id: affiliateId,
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

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

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
                                        origin: '',
                                        destination: '',
                                    })
                                    setStep(1) // Reset to the first step
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
                                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center w-full">
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

                                    {step === 1 && (
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="grid grid-cols-3 gap-3">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Year"
                                                    className="w-full border p-2 rounded"
                                                    value={form.year}
                                                    onChange={(e) => handleChange('year', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Manufacturer"
                                                    className="w-full border p-2 rounded"
                                                    value={form.manufacturer}
                                                    onChange={(e) => handleChange('manufacturer', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Model"
                                                    className="w-full border p-2 rounded"
                                                    value={form.model}
                                                    onChange={(e) => handleChange('model', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3 w-full">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Origin - City/State or Zip"
                                                    className="w-full border p-2 rounded"
                                                    value={form.origin}
                                                    onChange={(e) => handleChange('origin', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Destination - City/State or Zip"
                                                    className="w-full border p-2 rounded"
                                                    value={form.destination}
                                                    onChange={(e) => handleChange('destination', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="w-full border p-2 rounded"
                                                value={form.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="w-full border p-2 rounded"
                                                value={form.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Phone"
                                                className="w-full border p-2 rounded"
                                                value={form.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-center gap-8 w-full">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                            >
                                                Previous
                                            </button>
                                        )}
                                        {step < 2 ? (
                                            <button
                                                style={{ backgroundColor: buttonColor }}
                                                type="button"
                                                onClick={nextStep}
                                                className="bg-black w-full text-white px-4 py-2 rounded hover:bg-gray-800"
                                            >
                                                Next
                                            </button>
                                        ) : (
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
                                        )}
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}