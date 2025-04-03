'use client'

import { useEffect, useState } from 'react'

type Affiliate = {
    id: string
    company_name: string
    contact_name: string
    email: string
    phone: string
    website: string
    commission_rate: number
    created_at: string
}

type Lead = {
    id: number
    affiliate_id: string
}

export default function AffiliateDashboardContent() {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([])
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const baseUrl =
                process.env.NODE_ENV === 'development'
                    ? process.env.NEXT_PUBLIC_API_LOCAL
                    : process.env.NEXT_PUBLIC_API_URL;

            const [affiliatesRes, leadsRes] = await Promise.all([
                fetch(`${baseUrl}/api/affiliates`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
                    }
                }),
                fetch(`${baseUrl}/api/leads`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
                    }
                }),

            ]);

            const [affiliatesData, leadsData] = await Promise.all([
                affiliatesRes.json(),
                leadsRes.json(),
            ]);

            setAffiliates(affiliatesData);
            setLeads(leadsData);
            setLoading(false)
        }

        fetchData()
    }, [])

    const getLeadCount = (affiliateId: string) =>
        leads.filter((l) => l.affiliate_id === affiliateId).length

    if (loading) return <div className="p-4">Loading dashboard...</div>

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Affiliate Dashboard</h2>
            <p className="mb-2">Total Affiliates: {affiliates.length}</p>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-3 py-2 text-left">Company</th>
                            <th className="border px-3 py-2 text-left">Leads</th>
                            <th className="border px-3 py-2 text-left">Contact</th>
                            <th className="border px-3 py-2 text-left">Email</th>
                            <th className="border px-3 py-2 text-left">Phone</th>
                            <th className="border px-3 py-2 text-left">Website</th>
                            <th className="border px-3 py-2 text-left">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affiliates.map((a) => (
                            <tr key={a.id} className="border-t hover:bg-gray-50">
                                <td className="px-3 py-2 font-medium">{a.company_name}</td>
                                <td className="px-3 py-2">{getLeadCount(a.id)}</td>
                                <td className="px-3 py-2">{a.contact_name}</td>
                                <td className="px-3 py-2">{a.email}</td>
                                <td className="px-3 py-2">{a.phone}</td>
                                <td className="px-3 py-2">
                                    <a href={a.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                        {new URL(a.website).hostname}
                                    </a>
                                </td>
                                <td className="px-3 py-2">{new Date(a.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}