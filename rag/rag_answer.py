# ---------------------------------------------------------
# NARI-SHIELD RAG ANSWER
# ---------------------------------------------------------

import os
from groq import Groq

from retriever import retrieve_documents
from prompts import create_prompt


# ---------------------------------------------------------
# STEP 1: GET GROQ API KEY
# ---------------------------------------------------------

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("ERROR: GROQ_API_KEY is not set.")
    exit()


# ---------------------------------------------------------
# STEP 2: CREATE GROQ CLIENT
# ---------------------------------------------------------

client = Groq(api_key=api_key)


# ---------------------------------------------------------
# STEP 3: GENERATE RAG ANSWER
# ---------------------------------------------------------

def generate_answer(question):

    # Retrieve relevant information from FAISS
    results = retrieve_documents(question, k=3)


    # -----------------------------------------------------
    # CREATE TRUSTED CONTEXT
    # -----------------------------------------------------

    context_parts = []

    for result in results:

        context_parts.append(
            f"Source: {result['filename']}\n"
            f"{result['text']}"
        )

    context = "\n\n".join(context_parts)


    # -----------------------------------------------------
    # CREATE PROMPT
    # -----------------------------------------------------

    prompt = create_prompt(
        context,
        question
    )


    # -----------------------------------------------------
    # SEND PROMPT TO GROQ
    # -----------------------------------------------------

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )


    # -----------------------------------------------------
    # GET AI ANSWER
    # -----------------------------------------------------

    answer = response.choices[0].message.content


    # -----------------------------------------------------
    # GET SOURCE FILE NAMES
    # -----------------------------------------------------

    sources = []

    for result in results:

        filename = result["filename"]

        if filename not in sources:
            sources.append(filename)


    # -----------------------------------------------------
    # DETECT EMERGENCY
    # -----------------------------------------------------
    # These words indicate that the user may be in
    # immediate danger.
    # -----------------------------------------------------

    emergency_keywords = [
        "immediate danger",
        "danger",
        "help me",
        "attacking me",
        "being attacked",
        "threatening me",
        "following me",
        "someone is after me"
    ]

    question_lower = question.lower()

    emergency = any(
        keyword in question_lower
        for keyword in emergency_keywords
    )


    # -----------------------------------------------------
    # RETURN STRUCTURED RESULT
    # -----------------------------------------------------

    return {
        "answer": answer,
        "sources": sources,
        "emergency": emergency
    }


# ---------------------------------------------------------
# STEP 4: TEST THE RAG SYSTEM
# ---------------------------------------------------------

if __name__ == "__main__":

    question = "I am in immediate danger. What should I do?"

    result = generate_answer(question)


    # -----------------------------------------------------
    # DISPLAY ANSWER
    # -----------------------------------------------------

    print("\n====================================")
    print("NARI-SHIELD AI RESPONSE")
    print("====================================")

    print(result["answer"])


    # -----------------------------------------------------
    # DISPLAY SOURCES
    # -----------------------------------------------------

    print("\n====================================")
    print("SOURCES")
    print("====================================")

    for source in result["sources"]:
        print("-", source)


    # -----------------------------------------------------
    # DISPLAY EMERGENCY STATUS
    # -----------------------------------------------------

    print("\n====================================")
    print("EMERGENCY")
    print("====================================")

    print(result["emergency"])