# ---------------------------------------------------------
# NARI-SHIELD LIGHTWEIGHT EMBEDDINGS
# ---------------------------------------------------------

import re
import numpy as np
from collections import Counter


# Keep this dimension fixed for FAISS
EMBEDDING_DIM = 256


def tokenize(text):
    """
    Simple lightweight tokenizer.
    """
    text = text.lower()
    return re.findall(r"\b\w+\b", text)


def encode_texts(texts):
    """
    Convert text into lightweight TF-IDF-like
    hash-based embeddings.

    No SentenceTransformer.
    No PyTorch.
    No Hugging Face model.
    """

    embeddings = []

    for text in texts:

        tokens = tokenize(text)

        vector = np.zeros(
            EMBEDDING_DIM,
            dtype="float32"
        )

        if not tokens:
            embeddings.append(vector)
            continue

        counts = Counter(tokens)

        for token, count in counts.items():

            # Deterministic hash
            index = hash(token) % EMBEDDING_DIM

            vector[index] += float(count)

        # Normalize vector
        norm = np.linalg.norm(vector)

        if norm > 0:
            vector = vector / norm

        embeddings.append(vector)

    return np.asarray(
        embeddings,
        dtype="float32"
    )


def get_model():
    """
    Compatibility function.

    The old RAG code expects get_model().
    This lightweight implementation does not
    load any machine-learning model.
    """

    return None


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    print("\n====================================")
    print("NARI-SHIELD LIGHTWEIGHT EMBEDDINGS")
    print("====================================")

    test_text = [
        "Someone is following me and I am scared."
    ]

    embeddings = encode_texts(test_text)

    print("Embedding dimension:", embeddings.shape[1])
    print("Embedding shape:", embeddings.shape)

    print("====================================")
    print("EMBEDDINGS READY")
    print("====================================")