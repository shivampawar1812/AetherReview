import { getReport } from "@/lib/api";
import ReportCard from "@/components/ReportCard";

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

        <main className="max-w-6xlmx-autop-8space-y-8">

            <h1 className="
                text-5xl
                font-bold
            ">
                AetherSense Report
            </h1>


            <p className="
                text-gray-500
            ">
                Literature-grounded novelty analysis
            </p>

            <ReportCard title="Paper">
                <p>
                    {report.paper_info.title}
                </p>
            </ReportCard>

            <ReportCard title="Novelty Score">

                <div className="
                    text-6xl
                    font-bold
                    text-blue-600
                ">
                    {report.novelty_analysis.novelty_score}/10
                </div>

            </ReportCard>

            <ReportCard title="Similar Papers">

                <div className="space-y-4">

                    {report.similar_papers.map(
                        (
                            paper: any,
                            index: number
                        ) => (

                            <div
                                key={index}
                                className="
                                    border
                                    rounded-xl
                                    p-4
                                "
                            >

                                <h3 className="font-semibold">

                                    {paper.title}

                                </h3>

                                <div className="
                                    flex
                                    gap-6
                                    mt-2
                                    text-sm
                                    text-gray-500
                                ">

                                    <span>
                                        Similarity:
                                        {" "}
                                        {paper.similarity}%
                                    </span>

                                    <span>
                                        Citations:
                                        {" "}
                                        {paper.citations}
                                    </span>

                                    <span>
                                        Year:
                                        {" "}
                                        {paper.year}
                                    </span>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </ReportCard>

            <ReportCard title="Contributions">

                <ul className="
                    list-disc
                    ml-6
                    space-y-3
                ">

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

            </ReportCard>

            <ReportCard title="Research Gaps">

                <ul className="
                    list-disc
                    ml-6
                    space-y-3
                ">

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

            </ReportCard>

            <ReportCard title="Future Work">

                <ul className="
                    list-disc
                    ml-6
                    space-y-3
                ">

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

            </ReportCard>

            
        </main>
    );
}