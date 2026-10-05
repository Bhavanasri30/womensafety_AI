import numpy as np

from rag.faiss_index import index
from rag.embeddings import model
from rag.chunk_documents import chunks


def retrieve_documents(query, k=3):
    """
    Retrieve relevant document chunks using FAISS.

    Duplicate source files are removed so that
    the same document is not returned multiple times.
    """

    # Convert the user's question into an embedding
    query_embedding = model.encode([query])

    query_vector = np.array(
        query_embedding
    ).astype("float32")

    # Search FAISS
    # We search more chunks than needed because
    # some chunks may belong to the same document.
    search_k = max(k * 3, 10)

    distances, indices = index.search(
        query_vector,
        search_k
    )

    results = []

    # Keep track of source files already added
    seen_sources = set()

    for distance, idx in zip(
        distances[0],
        indices[0]
    ):

        # Ignore invalid FAISS indexes
        if idx < 0 or idx >= len(chunks):
            continue

        chunk = chunks[idx]

        filename = chunk["filename"]

        # Skip duplicate source documents
        if filename in seen_sources:
            continue

        seen_sources.add(filename)

        results.append({
            "filename": filename,
            "text": chunk["text"],
            "distance": float(distance)
        })

        # Stop when we have enough unique documents
        if len(results) >= k:
            break

    return results


# -----------------------------------------
# Testing
# -----------------------------------------

if __name__ == "__main__":

    test_questions = [
        "Someone is following me and I am scared.",
        "Someone is sending me threatening messages online.",
        "I am in immediate danger and someone is attacking me."
    ]

    print("\n====================================")
    print("NARI-SHIELD RETRIEVAL TEST")
    print("====================================")

    for question in test_questions:

        print("\n------------------------------------")
        print("Question:")
        print(question)

        results = retrieve_documents(
            question,
            k=3
        )

        print("\nRetrieved Unique Documents:")

        for i, result in enumerate(
            results,
            start=1
        ):

            print(f"\n--- Result {i} ---")

            print("Source:")
            print(result["filename"])

            print("Distance:")
            print(round(result["distance"], 4))

            print("Text:")
            print(result["text"][:300])

    print("\n====================================")
    print("RETRIEVAL TEST COMPLETE")
    print("====================================")