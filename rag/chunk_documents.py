# ---------------------------------------------------------
# NARI-SHIELD DOCUMENT CHUNKING
# ---------------------------------------------------------
# This file loads the safety documents and splits them into
# smaller chunks for embedding and FAISS retrieval.
# ---------------------------------------------------------

from langchain_text_splitters import RecursiveCharacterTextSplitter

# Import documents from the rag package
from rag.load_documents import documents


# ---------------------------------------------------------
# CREATE TEXT SPLITTER
# ---------------------------------------------------------
# Documents are divided into smaller pieces so that the
# embedding model and FAISS can search them effectively.
# ---------------------------------------------------------

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)


# ---------------------------------------------------------
# CREATE CHUNKS
# ---------------------------------------------------------

chunks = []

for document in documents:

    split_texts = text_splitter.split_text(
        document["text"]
    )

    for text in split_texts:

        chunks.append({
            "filename": document["filename"],
            "text": text
        })


# ---------------------------------------------------------
# INFORMATION
# ---------------------------------------------------------

print("Documents chunked successfully!")
print("Number of chunks:", len(chunks))


# ---------------------------------------------------------
# TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    print("\n====================================")
    print("NARI-SHIELD DOCUMENT CHUNKING")
    print("====================================")

    print("Documents loaded:", len(documents))
    print("Chunks created:", len(chunks))

    for i, chunk in enumerate(chunks[:3], start=1):

        print(f"\n--- Chunk {i} ---")
        print("Source:", chunk["filename"])
        print("Text:", chunk["text"])

    print("\n====================================")
    print("CHUNKING COMPLETE")
    print("====================================")