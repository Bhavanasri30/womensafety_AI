import os  # Used to work with files and folders


# Get the folder where this Python file is located
RAG_FOLDER = os.path.dirname(os.path.abspath(__file__))


# List of knowledge-base files that our RAG system will read
files = [
    "stalking_safety.txt",       # Stalking safety information
    "harassment_safety.txt",     # Harassment safety information
    "legal_safety.txt",          # Legal and reporting information
    "emergency_info.txt"         # Emergency information
]


# This list will store the documents after we read them
documents = []


# Go through each knowledge-base file one by one
for filename in files:

    # Create the complete path of the current file
    file_path = os.path.join(RAG_FOLDER, filename)

    # Open the current text file for reading
    with open(file_path, "r", encoding="utf-8") as file:

        # Read all the text from the current file
        text = file.read()

    # Store the file name and its text in the documents list
    documents.append({
        "filename": filename,
        "text": text
    })


# Count how many documents were loaded
print("Documents loaded:", len(documents))


# Display the name of every loaded document
for document in documents:
    print("Loaded:", document["filename"])