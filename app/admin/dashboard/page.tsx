'use client'

import { Suspense } from 'react'
import AffiliateDashboardContent from '@/components/AffiliateDashboardContent'

export default function AffiliateDashboard() {
    return (
        <Suspense fallback={<div className="p-4">Loading dashboard...</div>}>
            <AffiliateDashboardContent />
        </Suspense>
    )
}