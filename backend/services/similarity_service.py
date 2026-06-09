import numpy as np


def cosine_similarity(
    embedding1,
    embedding2
):
    """
    Compute cosine similarity.
    """

    emb1 = np.array(embedding1)

    emb2 = np.array(embedding2)

    return float(
        np.dot(
            emb1,
            emb2
        )
    )

def rank_papers(
    uploaded_embedding,
    candidate_papers,
    embedding_generator
):
    """
    Rank papers by similarity.
    """

    ranked = []

    for paper in candidate_papers:

        text = (
            (paper.get("title") or "")
            + "\n"
            + (paper.get("abstract") or "")
        )

        candidate_embedding = (
            embedding_generator(text)
        )

        score = cosine_similarity(
            uploaded_embedding,
            candidate_embedding
        )

        ranked.append(
            {
                "title":
                    paper.get("title"),

                "year":
                    paper.get("year"),

                "citations":
                    paper.get(
                        "citationCount",
                        0
                    ),

                "similarity":
                    round(
                        score * 100,
                        2
                    )
            }
        )

    ranked.sort(
        key=lambda x:
            x["similarity"],

        reverse=True
    )

    return ranked