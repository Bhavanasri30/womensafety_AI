import faiss  # Import FAISS for similarity search
import numpy as np  # Used to work with numerical arrays
from embeddings import embeddings  # Import the embeddings we created earlier


# Convert the embeddings into a NumPy array
embedding_matrix = np.array(embeddings).astype("float32")


# Get the number of dimensions in each embedding
dimension = embedding_matrix.shape[1]


# Create a FAISS index using L2 distance
index = faiss.IndexFlatL2(dimension)


# Add all our embedding vectors to the FAISS index
index.add(embedding_matrix)


# Display information about the FAISS index
print("Number of vectors in FAISS:", index.ntotal)
print("Embedding dimensions:", dimension)