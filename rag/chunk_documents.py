# ---------------------------------------------------------
# NARI-SHIELD DOCUMENT CHUNKING
# ---------------------------------------------------------
# This file splits the loaded safety documents into smaller
# chunks so that FAISS can search the relevant information.
# ---------------------------------------------------------

from langchain_text_splitters import RecursiveCharacterTextSplitter
from load_documents import documents


# ---------------------------------------------------------
# CREATE TEXT SPLITTER
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

    document_chunks = text_splitter.split_text(
        document["text"]
    )

    for chunk in document_chunks:

        chunks.append({
            "filename": document["filename"],
            "text": chunk
        })


# ---------------------------------------------------------
# INFORMATION FOR DEBUGGING
# ---------------------------------------------------------

print("Total chunks created:", len(chunks))