from fastapi import APIRouter, UploadFile, File

from services.file_service import save_pdf
from services.parser import extract_sections
from services.json_service import save_parsed_data

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_paper(
    file: UploadFile = File(...)
):
    saved = save_pdf(file)

    parsed = extract_sections(
        saved["path"]
    )

    save_parsed_data(
        saved["paper_id"],
        parsed
    )

    return {
        "paper_id": saved["paper_id"],
        "filename": saved["filename"],
        "title": parsed["title"],
        "status": "parsed and saved"
    }