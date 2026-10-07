# ---------------------------------------------------------
# NARI-SHIELD FAISS VECTOR DATABASE
# ---------------------------------------------------------
# Loads the existing FAISS index.
#
# The index should already be created locally and stored as:
# rag/faiss_index.bin
#
# This avoids generating document embeddings every time
# the backend starts.
# ---------------------------------------------------------

import os
import faiss


# ---------------------------------------------------------
# FAISS INDEX FILE
# ---------------------------------------------------------

INDEX_PATH = os.path.join(
    os.path.dirname(__file__),
    "faiss_index.bin"
)


# ---------------------------------------------------------
# LOAD EXISTING INDEX
# ---------------------------------------------------------

if not os.path.exists(INDEX_PATH):

    raise FileNotFoundError(
        f"FAISS index not found: {INDEX_PATH}"
    )


index = faiss.read_index(INDEX_PATH)


# ---------------------------------------------------------
# INFORMATION
# ---------------------------------------------------------

print("Existing FAISS index loaded successfully!")
print("Embedding dimension:", index.d)
print("Number of vectors:", index.ntotal)


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    print("\n====================================")
    print("NARI-SHIELD FAISS INDEX")
    print("====================================")

    print("Index type:", type(index).__name__)
    print("Embedding dimension:", index.d)
    print("Number of vectors:", index.ntotal)
    print("Index file:", INDEX_PATH)

    print("====================================")
    print("FAISS READY")
    print("====================================")