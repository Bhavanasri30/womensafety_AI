# ---------------------------------------------------------
# NARI-SHIELD EMBEDDINGS
# ---------------------------------------------------------
# This file converts document chunks into numerical
# embedding vectors for FAISS similarity search.
# ---------------------------------------------------------

from sentence_transformers import SentenceTransformer
from chunk_documents import chunks


# ---------------------------------------------------------
# LOAD MULTILINGUAL EMBEDDING MODEL
# ---------------------------------------------------------

model = SentenceTransformer(
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
)


# ---------------------------------------------------------
# GET TEXT FROM ALL CHUNKS
# ---------------------------------------------------------

chunk_texts = [
    chunk["text"] for chunk in chunks
]


# ---------------------------------------------------------
# CREATE EMBEDDINGS
# ---------------------------------------------------------

embeddings = model.encode(
    chunk_texts,
    show_progress_bar=True
)


# ---------------------------------------------------------
# BASIC INFORMATION
# ---------------------------------------------------------

print("Number of embeddings:", len(embeddings))
print("Embedding vector size:", len(embeddings[0]))