from fastapi import APIRouter, HTTPException

from services.json_service import (
    load_parsed_data
)

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.get("/{paper_id}")
def get_paper_data(
    paper_id: str
):
    data = load_parsed_data(
        paper_id
    )

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    return data