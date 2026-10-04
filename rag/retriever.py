# ---------------------------------------------------------
# NARI-SHIELD DOCUMENT RETRIEVER
# ---------------------------------------------------------
# This file searches the FAISS vector database and returns
# the most relevant safety information for a user question.
# ---------------------------------------------------------

import numpy as np

from faiss_index import index
from embeddings import model
from chunk_documents import chunks


# ---------------------------------------------------------
# FUNCTION: retrieve_documents
# ---------------------------------------------------------
# Input:
#   query -> user's question
#   k     -> number of relevant chunks to retrieve
#
# Output:
#   A list containing the most relevant documents
# ---------------------------------------------------------

def retrieve_documents(query, k=3):

    # Convert the user's question into an embedding
    query_embedding = model.encode([query])

    # Convert embedding into FAISS-compatible format
    query_vector = np.array(query_embedding).astype("float32")

    # Search the FAISS database
    distances, indices = index.search(query_vector, k)

    results = []

    # Get the retrieved chunks
    for distance, idx in zip(distances[0], indices[0]):

        chunk = chunks[idx]

        results.append({
            "filename": chunk["filename"],
            "text": chunk["text"],
            "distance": float(distance)
        })

    return results