# ---------------------------------------------------------
# NARI-SHIELD DOCUMENT RETRIEVER
# ---------------------------------------------------------

import numpy as np

from rag.faiss_index import index
from rag.embeddings import encode_texts
from rag.chunk_documents import chunks


def retrieve_documents(query, k=3):
    """
    Retrieve the most relevant document chunks using FAISS.
    """

    # Convert the user query into a lightweight embedding
    query_embedding = encode_texts([query])

    query_vector = np.asarray(
        query_embedding,
        dtype="float32"
    )

    # Search extra results so duplicate source files
    # can be removed
    search_k = min(
        max(k * 3, 10),
        index.ntotal
    )

    distances, indices = index.search(
        query_vector,
        search_k
    )

    results = []
    seen_sources = set()

    for distance, idx in zip(
        distances[0],
        indices[0]
    ):

        if idx < 0 or idx >= len(chunks):
            continue

        chunk = chunks[idx]
        filename = chunk["filename"]

        if filename in seen_sources:
            continue

        seen_sources.add(filename)

        results.append({
            "filename": filename,
            "text": chunk["text"],
            "distance": float(distance)
        })

        if len(results) >= k:
            break

    return results


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

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

        print("\nRetrieved Documents:")

        for i, result in enumerate(
            results,
            start=1
        ):

            print(f"\n--- Result {i} ---")
            print("Source:", result["filename"])
            print(
                "Distance:",
                round(result["distance"], 4)
            )
            print(
                "Text:",
                result["text"][:300]
            )

    print("\n====================================")
    print("RETRIEVAL TEST COMPLETE")
    print("====================================")