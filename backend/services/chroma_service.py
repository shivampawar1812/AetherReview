import chromadb

client = chromadb.PersistentClient(
    path="chromadb"
)

collection = client.get_or_create_collection(
    name="papers"
)

def add_chunks(
    paper_id,
    chunks,
    embeddings,
    title
):
    ids = []

    metadatas = []

    documents = []

    for idx, chunk in enumerate(chunks):

        ids.append(
            f"{paper_id}_{idx}"
        )

        documents.append(chunk)

        metadatas.append(
            {
                "paper_id": paper_id,
                "title": title,
                "chunk": idx
            }
        )

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )

def search_similar(
    embedding,
    n_results=5
):
    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results
    )

    response = []

    for metadata, distance in zip(
        results["metadatas"][0],
        results["distances"][0]
):
        response.append({
            "title": metadata["title"],
            "distance": distance
    })

    return response

def search_similar_chunks(
    embedding,
    n_results=10
):

    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results
    )

    seen = set()
    papers = []

    for metadata, distance in zip(
        results["metadatas"][0],
        results["distances"][0]
    ):

        paper_id = metadata["paper_id"]

        if paper_id in seen:
            continue

        seen.add(paper_id)

        papers.append({
            "paper_id": paper_id,
            "title": metadata["title"],
            "distance": float(distance)
        })

    return papers


