from fastapi import APIRouter, HTTPException

from services.json_service import load_parsed_data
from services.embedding_service import generate_embedding
from services.chroma_service import search_similar_chunks
from services.json_service import load_parsed_data
from services.semantic_scholar import search_papers
from services.json_service import load_parsed_data

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


@router.get("/{paper_id}/similar")
def similar_papers(
    paper_id: str
):
    paper = load_parsed_data(
        paper_id
    )

    if not paper:
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    text = (
        paper["title"]
        + "\n"
        + paper["abstract"]
    )

    embedding = generate_embedding(
        text
    )

    return search_similar_chunks(
        embedding
    )


@router.get(
    "/{paper_id}/literature"
)
def literature_search(
    paper_id: str
):
    paper = load_parsed_data(
        paper_id
    )

    if not paper:
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    query = paper["title"]

    papers = search_papers(
        query=query,
        limit=5
    )

    return {
        "query": query,
        "papers": papers
    }

def format_papers(
    papers
):
    formatted = []

    for paper in papers:

        formatted.append(
            {
                "title":
                    paper.get("title"),

                "year":
                    paper.get("year"),

                "citations":
                    paper.get(
                        "citationCount"
                    ),

                "authors":
                    [
                        author["name"]
                        for author
                        in paper.get(
                            "authors",
                            []
                        )
                    ]
            }
        )

    return formatted

    papers = format_papers(
    papers
    )