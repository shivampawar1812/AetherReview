"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

import { uploadPaper } from "@/lib/api";

export default function UploadForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setLoading(true);

        try {
            const result = await uploadPaper(selectedFile);

            router.push(
                `/report/${result.paper_id}`
            );
        } catch (error) {
            console.error(error);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-6">

            {/* Gradient Border Wrapper */}

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[36px]
                    p-[1px]

                    bg-gradient-to-br
                    from-[#ff4d94]
                    via-[#D4145A]
                    to-[#7A123F]

                    animate-border-pulse

                    shadow-[0_0_40px_rgba(212,20,90,0.35)]
                "
            >

                {/* Main Card */}

                <div
                    className="
                        relative
                        rounded-[34px]
                        bg-black/90
                        backdrop-blur-3xl
                        p-6
                    "
                >

                    {/* Ambient Glows */}

                    <div
                        className="
                            absolute
                            -top-24
                            -left-24
                            w-56
                            h-56
                            rounded-full
                            bg-[#D4145A]/20
                            blur-[90px]
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-24
                            -right-24
                            w-56
                            h-56
                            rounded-full
                            bg-[#D4145A]/15
                            blur-[90px]
                        "
                    />

                    {/* Inner Border */}

                    <div
                        className="
                            absolute
                            inset-0
                            rounded-[34px]
                            border
                            border-white/5
                            pointer-events-none
                        "
                    />

                    {/* Side Accent Lines */}

                    <div
                        className="
                            absolute
                            left-0
                            top-1/2
                            h-px
                            w-32
                            bg-[#D4145A]/60
                            blur-sm
                        "
                    />

                    <div
                        className="
                            absolute
                            right-0
                            top-1/2
                            h-px
                            w-32
                            bg-[#D4145A]/60
                            blur-sm
                        "
                    />

                    {/* Drop Zone */}

                    <div
                        className="
                            relative
                            border
                            border-dashed
                            border-white/10
                            hover:border-[#D4145A]/50
                            transition-all
                            duration-500
                            rounded-[28px]
                            py-7
                            px-10
                            text-center
                        "
                    >

                        <UploadCloud
                            className="
                                w-13
                                h-13
                                mx-auto
                                mb-1
                                text-[#D4145A]
                            "
                        />

                        <h3
                            className="
                                text-xl
                                font-bold
                                text-white
                                mb-1
                            "
                        >
                            Upload Your Research Paper
                        </h3>

                        <p
                            className="
                                text-zinc-400
                                text-lg
                                mb-4
                            "
                        >
                            PDF only • Up to 10 MB
                        </p>

                        {/* Hidden Input */}

                        <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleUpload}
                        />

                        {/* Upload Button */}

                        <label
                            htmlFor="pdf-upload"
                            className="
                                inline-flex
                                items-center
                                gap-3
                                cursor-pointer

                                rounded-2xl

                                bg-gradient-to-r
                                from-[#D4145A]
                                to-[#E91E63]

                                px-8
                                py-3

                                font-semibold
                                text-white

                                shadow-lg
                                shadow-[#D4145A]/25

                                transition-all
                                duration-300

                                hover:scale-105
                                hover:shadow-[#D4145A]/50
                            "
                        >
                            <UploadCloud className="w-5 h-5" />

                            {loading
                                ? "Analyzing..."
                                : "Choose PDF File"}
                        </label>

                        {/* Selected File */}

                        {file && !loading && (
                            <p
                                className="
                                    mt-6
                                    text-sm
                                    text-zinc-400
                                "
                            >
                                Selected: {file.name}
                            </p>
                        )}

                        {/* Loading */}

                        {loading && (
                            <p
                                className="
                                    mt-6
                                    text-sm
                                    text-[#D4145A]
                                    animate-pulse
                                "
                            >
                                Uploading and indexing manuscript...
                            </p>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}