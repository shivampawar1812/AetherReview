from fastapi import APIRouter, UploadFile, File

from services.file_service import save_pdf
from services.parser import extract_sections
from services.json_service import save_parsed_data
from services.embedding_service import generate_embedding
from services.chunk_service import chunk_text
from services.embedding_service import generate_embeddings
from services.chroma_service import add_chunks

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

    body = parsed["body"]

    chunks = chunk_text(body)

    embeddings = generate_embeddings(
        chunks
    )

    add_chunks(
    paper_id=saved["paper_id"],
    chunks=chunks,
    embeddings=embeddings,
    title=parsed["title"]
)
    
    return {
    "paper_id": saved["paper_id"],
    "filename": saved["filename"],
    "title": parsed["title"],
    "status": "indexed",
    "vectorized": True
}


