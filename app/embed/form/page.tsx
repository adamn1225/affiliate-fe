'use client'

import { Suspense } from 'react'
import EmbedForm from '../../components/EmbedForm'

export default function EmbedFormWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmbedForm />
        </Suspense>
    )
}