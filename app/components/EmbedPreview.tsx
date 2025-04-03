'use client'
import React from 'react'

type Props = {
    affiliateId: string
    buttonColor: string
    formTitle: string
}

export default function EmbedPreview({ affiliateId, buttonColor, formTitle }: Props) {
    const previewUrl = `https://nextload.vercel.app/embed/form?affiliate=${affiliateId}&button_color=${encodeURIComponent(buttonColor)}&form_title=${encodeURIComponent(formTitle || 'Request a Transport Quote')}`

    return (
        <div className="w-full mt-6">
            <h3 className="text-lg font-semibold mb-2">Live Form Preview</h3>
            <iframe
                src={previewUrl}
                title="Form Preview"
                className="w-full border border-gray-300 shadow p-8 rounded"
                style={{ height: 600 }}
            />
        </div>
    )
}
