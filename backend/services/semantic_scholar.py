import requests

BASE_URL = "https://api.semanticscholar.org/graph/v1"


def search_papers(query, limit=5):

    url = f"{BASE_URL}/paper/search"

    params = {
        "query": query,
        "limit": limit,
        "fields": "title,abstract,citationCount,year,authors"
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=30
        )

        if response.status_code == 429:
            return {
                "error": "Semantic Scholar rate limit exceeded",
                "papers": []
            }

        response.raise_for_status()

        return {
            "papers": response.json().get("data", [])
        }

    except requests.exceptions.RequestException as e:

        return {
            "error": str(e),
            "papers": []
        }