from fastapi import APIRouter

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)

@router.get("/")
def analysis_status():
    return {
        "status": "Analysis endpoint ready"
    }