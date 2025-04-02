'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Lead = {
    id: number
    name: string
    email: string
    phone: string
    year: string
    manufacturer: string
    model: string
    pickup: string
    dropoff: string
    created_at: string
}

export default function AffiliateDashboardContent() {
    const searchParams = useSearchParams()
    const affiliateId = searchParams.get('id')
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!affiliateId) return

        fetch(`https://affiliate-tracking.onrender.com/api/leads`)
            .then((res) => res.json())
            .then((data) => {
                setLeads(data)
                setLoading(false)
            })
    }, [affiliateId])

    if (!affiliateId) return <div className="p-4">Missing affiliate ID</div>
    if (loading) return <div className="p-4">Loading leads...</div>

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Leads for Affiliate: {affiliateId}</h2>
            <p className="mb-2">Total Leads: {leads.length}</p>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-3 py-2 text-left">Name</th>
                            <th className="border px-3 py-2 text-left">Equipment</th>
                            <th className="border px-3 py-2 text-left">Pickup → Dropoff</th>
                            <th className="border px-3 py-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} className="border-t">
                                <td className="px-3 py-2">{lead.name}</td>
                                <td className="px-3 py-2">
                                    {lead.year} {lead.manufacturer} {lead.model}
                                </td>
                                <td className="px-3 py-2">
                                    {lead.pickup} → {lead.dropoff}
                                </td>
                                <td className="px-3 py-2">
                                    {new Date(lead.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}