import Link from "next/link";

import { getReport } from "@/lib/api";
import Image from "next/image";
export default async function ReportPage(
    {
        params,
    }: {
        params: Promise<{
            paperId: string;
        }>;
    }
) {

    const { paperId } = await params;

    const report = await getReport(
        paperId
    );

    return (

        <main className="
            min-h-screen
            bg-black
            text-white
            px-6
            py-12
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">

                {/* Hero */}

                {/* Hero */}

                <div className="
    flex
    flex-col
    md:flex-row
    md:items-start
    md:justify-between
    gap-8
    mb-12
">

                    {/* Left Side */}

                    <div>

                        <Link
                            href="/"
                            className="
                text-zinc-400
                hover:text-white
                transition-colors
            "
                        >
                            ← Back to Home
                        </Link>

                        <p className="
            uppercase
            tracking-[0.3em]
            text-sm
            text-[#D4145A]
            mt-10
            mb-4
        ">
                            Novelty Intelligence Report
                        </p>

                        <h1 className="
            text-4xl
            md:text-5xl
            font-bold
            mb-4
            max-w-4xl
        ">
                            {report.paper_info.title}
                        </h1>

                        <p className="text-zinc-500">
                            Paper ID: {paperId}
                        </p>

                    </div>

                    {/* Logo */}

                    <div className="
        flex
        justify-center
        md:justify-end
    ">

                        <Image
                            src="/AetherSense Short.png"
                            alt="AetherSense"
                            width={140}
                            height={140}
                            className="
                w-24
                md:w-32
                h-auto
                object-contain
                opacity-90
                hover:scale-105
                transition-transform
                duration-300
            "
                        />

                    </div>

                </div>

                {/* Novelty Overview */}

                <div className="
                    grid
                    lg:grid-cols-3
                    gap-8
                    mb-12
                ">

                    {/* Score */}

                    <div className="
                        rounded-3xl
                        border
                        border-[#D4145A]/30
                        bg-white/5
                        backdrop-blur-xl
                        p-8
                    ">

                        <p className="
                            text-zinc-400
                            mb-4
                        ">
                            Novelty Score
                        </p>

                        <h2 className="
                            text-7xl
                            font-bold
                            text-[#D4145A]
                        ">
                            {report.novelty_analysis.novelty_score}/10
                        </h2>

                        <p className="
                            mt-4
                            text-zinc-400
                        ">

                            {report.novelty_analysis.novelty_score >= 8
                                ? "High Novelty Potential"
                                : "Moderate Novelty Potential"}

                        </p>

                    </div>

                    {/* Summary */}

                    <div className="
                        lg:col-span-2
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                        p-8
                    ">

                        <h3 className="
                            text-2xl
                            font-semibold
                            mb-6
                        ">
                            Executive Summary
                        </h3>

                        <p className="
                            text-zinc-300
                            leading-8
                        ">
                            {report.novelty_analysis.summary}
                        </p>

                    </div>

                </div>

                {/* Intelligence Grid */}

                <div className="
                    grid
                    md:grid-cols-3
                    gap-8
                    mb-12
                ">

                    {[
                        {
                            title: "Key Contributions",
                            data: report.novelty_analysis.contributions,
                        },
                        {
                            title: "Research Gaps",
                            data: report.novelty_analysis.research_gaps,
                        },
                        {
                            title: "Future Directions",
                            data: report.novelty_analysis.future_work,
                        },
                    ].map((section) => (

                        <div
                            key={section.title}
                            className="
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-8
                            "
                        >

                            <h3 className="
                                text-xl
                                font-semibold
                                mb-6
                            ">
                                {section.title}
                            </h3>

                            <ul className="
                                space-y-4
                                text-zinc-300
                            ">

                                {section.data.map(
                                    (
                                        item: string,
                                        index: number
                                    ) => (

                                        <li
                                            key={index}
                                            className="
                                                flex
                                                gap-3
                                            "
                                        >

                                            <span className="
                                                text-[#D4145A]
                                            ">
                                                •
                                            </span>

                                            <span>
                                                {item}
                                            </span>

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    ))}

                </div>

                {/* Similar Literature */}

                <div className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-8
                ">

                    <h3 className="
                        text-2xl
                        font-semibold
                        mb-8
                    ">
                        Related Literature
                    </h3>

                    <div className="
                        overflow-x-auto
                    ">

                        <table className="
                            w-full
                        ">

                            <thead>

                                <tr className="
                                    text-left
                                    text-zinc-400
                                    border-b
                                    border-white/10
                                ">

                                    <th className="pb-4">
                                        Title
                                    </th>

                                    <th className="pb-4">
                                        Similarity
                                    </th>

                                    <th className="pb-4">
                                        Citations
                                    </th>

                                    <th className="pb-4">
                                        Year
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {report.similar_papers.map(
                                    (
                                        paper: any,
                                        index: number
                                    ) => (

                                        <tr
                                            key={index}
                                            className="
                                                border-b
                                                border-white/5
                                            "
                                        >

                                            <td className="
                                                py-6
                                                pr-6
                                            ">
                                                {paper.title}
                                            </td>

                                            <td className="py-6">

                                                <span className="
                                                    rounded-full
                                                    bg-[#D4145A]/20
                                                    text-[#D4145A]
                                                    px-3
                                                    py-1
                                                    text-sm
                                                ">

                                                    {paper.similarity}%

                                                </span>

                                            </td>

                                            <td className="py-6">
                                                {paper.citations}
                                            </td>

                                            <td className="py-6">
                                                {paper.year}
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </main>

    );
}

