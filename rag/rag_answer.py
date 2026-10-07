# ---------------------------------------------------------
# NARI-SHIELD RAG ANSWER SYSTEM
# ---------------------------------------------------------

import os

from dotenv import load_dotenv
from groq import Groq

from rag.retriever import retrieve_documents
from rag.prompts import create_prompt


# ---------------------------------------------------------
# LOAD ENVIRONMENT VARIABLES
# ---------------------------------------------------------

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError(
        "GROQ_API_KEY is not set. "
        "Please add GROQ_API_KEY to your .env file."
    )


# ---------------------------------------------------------
# GROQ CLIENT
# ---------------------------------------------------------

client = Groq(api_key=api_key)


# ---------------------------------------------------------
# EMERGENCY DETECTION
# ---------------------------------------------------------

def detect_emergency(question):
    """
    Detect emergency-related situations in
    English, Telugu and Hindi.
    """

    question_lower = question.lower()

    emergency_keywords = [

        # English
        "immediate danger",
        "danger",
        "help me",
        "attacking me",
        "being attacked",
        "threatening me",
        "following me",
        "someone is after me",
        "i am unsafe",
        "i am in danger",

        # Telugu
        "వెంబడిస్తున్నారు",
        "వెంటాడుతున్నారు",
        "దాడి చేస్తున్నారు",
        "దాడి",
        "ప్రమాదంలో",
        "ప్రమాదం",
        "సహాయం కావాలి",
        "నన్ను బెదిరిస్తున్నారు",
        "బెదిరిస్తున్నారు",

        # Hindi
        "मेरा पीछा कर रहा है",
        "मेरा पीछा कर रहे हैं",
        "मुझे धमकी दे रहा है",
        "मुझे धमकी दे रहे हैं",
        "मुझ पर हमला",
        "हमला कर रहा है",
        "खतरे में",
        "मदद चाहिए",
        "मैं खतरे में हूं"
    ]

    for keyword in emergency_keywords:

        if keyword in question_lower:
            return True

    return False


# ---------------------------------------------------------
# GENERATE RAG ANSWER
# ---------------------------------------------------------

def generate_answer(question):
    """
    Complete RAG pipeline:

    Question
        ↓
    FAISS retrieval
        ↓
    Context creation
        ↓
    Prompt
        ↓
    Groq LLM
        ↓
    Answer + sources + emergency status
    """

    # -----------------------------------------------------
    # STEP 1: RETRIEVE RELEVANT DOCUMENTS
    # -----------------------------------------------------

    results = retrieve_documents(
        question,
        k=3
    )


    # -----------------------------------------------------
    # STEP 2: CREATE CONTEXT
    # -----------------------------------------------------

    context_parts = []

    for result in results:

        context_parts.append(
            f"Source: {result['filename']}\n"
            f"{result['text']}"
        )

    context = "\n\n".join(context_parts)


    # -----------------------------------------------------
    # STEP 3: CREATE PROMPT
    # -----------------------------------------------------

    prompt = create_prompt(
        context,
        question
    )


    # -----------------------------------------------------
    # STEP 4: GENERATE ANSWER USING GROQ
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

    answer = response.choices[0].message.content


    # -----------------------------------------------------
    # STEP 5: COLLECT SOURCES
    # -----------------------------------------------------

    sources = []

    for result in results:

        filename = result["filename"]

        if filename not in sources:
            sources.append(filename)


    # -----------------------------------------------------
    # STEP 6: DETECT EMERGENCY
    # -----------------------------------------------------

    emergency = detect_emergency(question)


    # -----------------------------------------------------
    # STEP 7: RETURN RESULT
    # -----------------------------------------------------

    return {
        "answer": answer,
        "sources": sources,
        "emergency": emergency
    }


# ---------------------------------------------------------
# DIRECT TEST
# ---------------------------------------------------------

if __name__ == "__main__":

    question = (
        "I am in immediate danger. "
        "Someone is following me. What should I do?"
    )

    result = generate_answer(question)

    print("\n====================================")
    print("NARI-SHIELD AI RESPONSE")
    print("====================================")

    print(result["answer"])

    print("\n====================================")
    print("SOURCES")
    print("====================================")

    for source in result["sources"]:
        print("-", source)

    print("\n====================================")
    print("EMERGENCY")
    print("====================================")

    print(result["emergency"])