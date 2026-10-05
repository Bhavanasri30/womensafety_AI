# ---------------------------------------------------------
# NARI-SHIELD FAISS VECTOR DATABASE
# ---------------------------------------------------------
# This file:
# 1. Creates the FAISS index for the first time
# 2. Saves the index to disk
# 3. Loads the saved index on future runs
# ---------------------------------------------------------

import os
import faiss

from rag.embeddings import embeddings


# ---------------------------------------------------------
# FAISS INDEX FILE
# ---------------------------------------------------------

INDEX_PATH = os.path.join(
    os.path.dirname(__file__),
    "faiss_index.bin"
)


# ---------------------------------------------------------
# CREATE OR LOAD FAISS INDEX
# ---------------------------------------------------------

if os.path.exists(INDEX_PATH):

    # -----------------------------------------------------
    # Load existing FAISS index
    # -----------------------------------------------------

    index = faiss.read_index(INDEX_PATH)

    print("Existing FAISS index loaded successfully!")
    print("Embedding dimension:", index.d)
    print("Number of vectors:", index.ntotal)

else:

    # -----------------------------------------------------
    # Create a new FAISS index
    # -----------------------------------------------------

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    # Add document embeddings
    index.add(embeddings)

    # -----------------------------------------------------
    # Save the index
    # -----------------------------------------------------

    faiss.write_index(index, INDEX_PATH)

    print("New FAISS index created successfully!")
    print("Embedding dimension:", dimension)
    print("Number of vectors:", index.ntotal)
    print("FAISS index saved to:", INDEX_PATH)


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