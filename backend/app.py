from fastapi import FastAPI
from routes.upload import router as upload_router
from routes.analysis import router as analysis_router

app = FastAPI(
    title="AetherReview API",
    version="1.0.0",
    description="AI-Powered Research Novelty Analysis Platform"
)

app.include_router(upload_router)
app.include_router(analysis_router)

@app.get("/")
def root():
    return {
        "message": "AetherReview API Running"
    }