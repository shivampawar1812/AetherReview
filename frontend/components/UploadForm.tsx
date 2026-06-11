"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { uploadPaper } from "@/lib/api"

export default function UploadForm() {

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState<File | null>(null)

    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        const selectedFile = e.target.files?.[0]

        if (!selectedFile) return

        setFile(selectedFile)

        setLoading(true)

        try {

            const result = await uploadPaper(selectedFile)

            router.push(
                `/report/${result.paper_id}`
            )

        } catch (error) {

            console.error(error)

            alert("Upload failed.")

        } finally {

            setLoading(false)
        }
    }

    return (

        <div
            className="
                max-w-xl
                mx-auto
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-10
                hover:border-pink-500/40
                transition-all
            "
        >

            <input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleUpload}
            />

            <label
                htmlFor="pdf-upload"
                className="
                    inline-flex
                    items-center
                    justify-center
                    cursor-pointer
                    bg-gradient-to-r
                    from-[#C2185B]
                    to-[#D81B60]
                    hover:from-[#D81B60]
                    hover:to-[#E91E63]
                    px-8
                    py-4
                    rounded-2xl
                    font-medium
                    transition-all
                    shadow-lg
                    shadow-pink-400/20
                "
            >
                {loading
                    ? "Analyzing..."
                    : file
                        ? "Change Manuscript"
                        : "Analyze My Paper"}
            </label>

            {file && !loading && (
                <p className="mt-4 text-zinc-400 text-sm">
                    Selected: {file.name}
                </p>
            )}

            {loading && (
                <p className="mt-4 text-pink-400 text-sm animate-pulse">
                    Uploading and indexing your manuscript...
                </p>
            )}

        </div>
    )
}