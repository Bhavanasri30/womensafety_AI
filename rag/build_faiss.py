# ---------------------------------------------------------
# NARI-SHIELD FAISS INDEX BUILDER
# ---------------------------------------------------------

import os
import faiss
import numpy as np

from rag.chunk_documents import chunks
from rag.embeddings import encode_texts


# ---------------------------------------------------------
# INDEX PATH
# ---------------------------------------------------------

INDEX_PATH = os.path.join(
    os.path.dirname(__file__),
    "faiss_index.bin"
)


# ---------------------------------------------------------
# CREATE EMBEDDINGS
# ---------------------------------------------------------

print("\n====================================")
print("NARI-SHIELD FAISS INDEX BUILDER")
print("====================================")

print("Documents chunks:", len(chunks))

texts = [
    chunk["text"]
    for chunk in chunks
]

embeddings = encode_texts(texts)

embeddings = np.asarray(
    embeddings,
    dtype="float32"
)

print("Embedding shape:", embeddings.shape)


# ---------------------------------------------------------
# CREATE FAISS INDEX
# ---------------------------------------------------------

embedding_dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(
    embedding_dimension
)

index.add(embeddings)


# ---------------------------------------------------------
# SAVE INDEX
# ---------------------------------------------------------

faiss.write_index(
    index,
    INDEX_PATH
)


# ---------------------------------------------------------
# RESULT
# ---------------------------------------------------------

print("\n====================================")
print("FAISS INDEX CREATED SUCCESSFULLY")
print("====================================")

print("Embedding dimension:", index.d)
print("Number of vectors:", index.ntotal)
print("Index file:", INDEX_PATH)

print("====================================")
print("FAISS READY")
print("====================================")