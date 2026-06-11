const API_BASE = "http://localhost:8000";

export async function uploadPaper(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${API_BASE}/upload/`,
        {
            method: "POST",
            body: formData,
        }
    );

    return response.json();
}


export async function getReport(
    paperId: string
) {
    const response = await fetch(
        `${API_BASE}/analysis/${paperId}/report`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch report"
        );
    }

    return response.json();
}