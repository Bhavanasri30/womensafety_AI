# ---------------------------------------------------------
# NARI-SHIELD EMBEDDINGS
# ---------------------------------------------------------
# This file converts the document chunks into numerical
# vectors using a multilingual Sentence Transformer model.
# ---------------------------------------------------------

from sentence_transformers import SentenceTransformer

# Import chunks from the rag package
from rag.chunk_documents import chunks


# ---------------------------------------------------------
# LOAD EMBEDDING MODEL
# ---------------------------------------------------------
# This model supports multiple languages and creates
# 384-dimensional embeddings.
# ---------------------------------------------------------

model = SentenceTransformer(
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
)


# ---------------------------------------------------------
# EXTRACT TEXT FROM CHUNKS
# ---------------------------------------------------------

texts = [chunk["text"] for chunk in chunks]


# ---------------------------------------------------------
# CREATE EMBEDDINGS
# ---------------------------------------------------------

embeddings = model.encode(
    texts,
    convert_to_numpy=True
)


# ---------------------------------------------------------
# INFORMATION
# ---------------------------------------------------------

print("Embedding model loaded successfully!")
print("Number of document chunks:", len(chunks))
print("Embedding shape:", embeddings.shape)


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    print("\n====================================")
    print("NARI-SHIELD EMBEDDING MODEL")
    print("====================================")

    print("Model:")
    print("paraphrase-multilingual-MiniLM-L12-v2")

    print("Number of chunks:", len(chunks))
    print("Embedding shape:", embeddings.shape)

    print("====================================")
    print("EMBEDDINGS READY")
    print("====================================")