interface ReportCardProps {
    title: string;
    children: React.ReactNode;
}

export default function ReportCard({
    title,
    children,
}: ReportCardProps) {
    return (
        <div className="
            bg-zinc-900
            border-zinc-800
            text-white
            text-zinc-300
            rounded-2xl
            shadow-md
            p-5
            space-y-6
            border
        ">
            <h2 className="
                text-2xl
                font-semibold
                mb-4
            ">
                {title}
            </h2>

            {children}
        </div>
    );
}