from fastapi import APIRouter, HTTPException

from services.json_service import load_parsed_data
from services.embedding_service import generate_embedding
from services.chroma_service import search_similar_chunks
from services.json_service import load_parsed_data
from services.semantic_scholar import search_papers
from services.json_service import load_parsed_data
from services.embedding_service import generate_embedding
from services.similarity_service import rank_papers
from services.llm_service import analyze_novelty

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


@router.get("/{paper_id}/literature")
def literature_search(paper_id: str):

    paper = load_parsed_data(paper_id)

    if not paper:
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    query = paper["title"]

    print("\n===== QUERY =====")
    print(query)

    uploaded_text = (
        paper["abstract"]
        + "\n"
        + paper["conclusion"]
    )

    uploaded_embedding = generate_embedding(
        uploaded_text
    )

    result = search_papers(
        query=query,
        limit=10
    )

    print("\n===== SEARCH RESULT =====")
    print(result)

    if "error" in result:
        return {
            "query": query,
            "error": result["error"],
            "similar_papers": []
        }

    ranked = rank_papers(
        uploaded_embedding,
        result["papers"],
        generate_embedding
    )

    print("\n===== RANKED PAPERS =====")
    print(ranked)

    return {
        "query": query,
        "similar_papers": ranked[:5]
    }
    
@router.get("/{paper_id}/novelty")
def novelty_analysis(
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
    
    similar_response = literature_search(
        paper_id
    )
    
    similar_papers = (similar_response.get("similar_papers", []))

    result = analyze_novelty(
        uploaded_paper={
            "title":
                paper["title"],

            "abstract":
                paper["abstract"],

            "conclusion":
                paper["conclusion"]
        },

        similar_papers=similar_papers
    )

    return result


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
