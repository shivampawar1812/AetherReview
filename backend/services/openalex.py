import requests

BASE_URL = "https://api.openalex.org/works"


def search_papers(query, limit=10):
    """
    Search OpenAlex for related literature.
    """

    params = {
        "search": query,
        "per-page": limit
    }

    try:
        response = requests.get(
            BASE_URL,
            params=params,
            timeout=30
        )

        response.raise_for_status()

        data = response.json()

        papers = []

        for work in data.get("results", []):

            papers.append(
                {
                    "title":
                        work.get("display_name"),

                    "abstract":
                        "",

                    "year":
                        work.get(
                            "publication_year"
                        ),

                    "citationCount":
                        work.get(
                            "cited_by_count",
                            0
                        ),

                    "authors":
                        [
                            author["author"][
                                "display_name"
                            ]
                            for author
                            in work.get(
                                "authorships",
                                []
                            )
                        ]
                }
            )

        return {
            "papers": papers
        }

    except requests.exceptions.RequestException as e:

        return {
            "error": str(e),
            "papers": []
        }