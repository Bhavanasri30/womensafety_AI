# Import our retriever function
from retriever import retrieve_documents


# ---------------------------------------------------------
# FUNCTION: build_context
# ---------------------------------------------------------
# This function takes the user's question,
# retrieves the most relevant documents,
# and combines their text into one context.
# ---------------------------------------------------------

def build_context(query, k=3):

    # Retrieve the most relevant chunks
    results = retrieve_documents(query, k)

    # Create an empty list to store retrieved text
    context_parts = []

    # Go through every retrieved result
    for result in results:

        # Add the source filename and its text
        context_parts.append(
            f"Source: {result['filename']}\n"
            f"{result['text']}"
        )

    # Combine all retrieved chunks into one context
    context = "\n\n".join(context_parts)

    # Return the final context
    return context


# ---------------------------------------------------------
# TEST THE RAG CONTEXT
# ---------------------------------------------------------

# Example user question
query = "Someone is following me. What should I do?"


# Build context from the knowledge base
context = build_context(query, k=3)


# ---------------------------------------------------------
# DISPLAY THE RESULT
# ---------------------------------------------------------

print("\nUser Question:")
print(query)

print("\nRetrieved Context:")
print(context)