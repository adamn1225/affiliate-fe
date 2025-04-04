'use client'
import React from 'react'

type Props = {
    affiliateId: string
    buttonColor: string
    formTitle: string
}

export default function EmbedPreview({ affiliateId, buttonColor, formTitle }: Props) {
    const previewUrl = `https://affilaform.com/embed/form?affiliate=${affiliateId}&button_color=${encodeURIComponent(buttonColor)}&form_title=${encodeURIComponent(formTitle || 'Request a Transport Quote')}`



    return (
        <div className="mt-6 w-full">
            <h3 className="text-lg font-semibold mb-2">Live Form Preview</h3>
            <iframe
                src={previewUrl}
                title="Form Preview"
                className="w-full border rounded p-20"
                style={{ height: 600 }}
            />
        </div>
    )
}
