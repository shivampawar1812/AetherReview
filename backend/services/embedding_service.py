from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "BAAI/bge-small-en-v1.5"
)



def generate_embedding(text):
    """
    Convert text into vector embedding.
    """

    embedding = model.encode(
        text,
        normalize_embeddings=True
    )

    return embedding.tolist()

def generate_embeddings(
    chunks
):
    embeddings = model.encode(
        chunks,
        normalize_embeddings=True
    )

    return embeddings.tolist()