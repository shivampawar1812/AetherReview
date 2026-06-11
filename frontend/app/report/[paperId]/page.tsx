import { getReport } from "@/lib/api";

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

        <main className="max-w-5xl mx-auto p-8 space-y-10">

            <h1 className="text-4xl font-bold">
                AetherSense Report
            </h1>

            <section>
                <h2 className="text-2xl font-semibold">
                    Paper
                </h2>

                <p className="mt-2">
                    {report.paper_info.title}
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">
                    Novelty Score
                </h2>

                <p className="text-5xl font-bold mt-2">
                    {report.novelty_analysis.novelty_score}/10
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">
                    Contributions
                </h2>

                <ul className="list-disc ml-6 mt-3 space-y-2">

                    {report.novelty_analysis.contributions.map(
                        (
                            item: string,
                            index: number
                        ) => (

                            <li key={index}>
                                {item}
                            </li>

                        )
                    )}

                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">
                    Research Gaps
                </h2>

                <ul className="list-disc ml-6 mt-3 space-y-2">

                    {report.novelty_analysis.research_gaps.map(
                        (
                            item: string,
                            index: number
                        ) => (

                            <li key={index}>
                                {item}
                            </li>

                        )
                    )}

                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">
                    Future Work
                </h2>

                <ul className="list-disc ml-6 mt-3 space-y-2">

                    {report.novelty_analysis.future_work.map(
                        (
                            item: string,
                            index: number
                        ) => (

                            <li key={index}>
                                {item}
                            </li>

                        )
                    )}

                </ul>
            </section>

            <section>

                <h2 className="text-2xl font-semibold">
                    Similar Papers
                </h2>

                <div className="mt-4 space-y-4">

                    {report.similar_papers.map(
                        (
                            paper: any,
                            index: number
                        ) => (

                            <div
                                key={index}
                                className="border rounded-lg p-4"
                            >

                                <h3 className="font-semibold">
                                    {paper.title}
                                </h3>

                                <p>
                                    Similarity:
                                    {" "}
                                    {paper.similarity}%
                                </p>

                                <p>
                                    Citations:
                                    {" "}
                                    {paper.citations}
                                </p>

                            </div>

                        )
                    )}

                </div>

            </section>

        </main>
    );
}