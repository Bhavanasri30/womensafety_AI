# ---------------------------------------------------------
# NARI-SHIELD EMBEDDINGS
# ---------------------------------------------------------

from sentence_transformers import SentenceTransformer


MODEL_NAME = (
    "sentence-transformers/"
    "paraphrase-multilingual-MiniLM-L12-v2"
)

_model = None


def get_model():
    """
    Load the embedding model only when it is needed.
    """

    global _model

    if _model is None:

        print("Loading embedding model...")

        _model = SentenceTransformer(
            MODEL_NAME,
            device="cpu"
        )

        print("Embedding model loaded successfully!")

    return _model


def encode_texts(texts):
    """
    Convert text into embeddings.
    """

    model = get_model()

    return model.encode(
        texts,
        convert_to_numpy=True
    )


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    print("\n====================================")
    print("NARI-SHIELD EMBEDDING MODEL")
    print("====================================")

    print("Model:")
    print(MODEL_NAME)

    print("Device:")
    print("CPU")

    test_text = [
        "Someone is following me and I am scared."
    ]

    embeddings = encode_texts(test_text)

    print("Embedding shape:", embeddings.shape)

    print("====================================")
    print("EMBEDDINGS READY")
    print("====================================")