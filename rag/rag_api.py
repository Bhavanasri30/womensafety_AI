# ---------------------------------------------------------
# NARI-SHIELD RAG API
# ---------------------------------------------------------
# This API connects the RAG chatbot to the frontend.
#
# Input:
#   message
#   language
#
# Output:
#   answer
#   sources
#   emergency
#   language
# ---------------------------------------------------------

from fastapi import FastAPI
from pydantic import BaseModel
from deep_translator import GoogleTranslator

from rag_answer import generate_answer


# ---------------------------------------------------------
# CREATE FASTAPI APPLICATION
# ---------------------------------------------------------

app = FastAPI(
    title="Nari-Shield RAG API",
    description="AI Safety Chatbot API",
    version="1.0"
)


# ---------------------------------------------------------
# REQUEST MODEL
# ---------------------------------------------------------

class ChatRequest(BaseModel):

    message: str

    language: str = "english"


# ---------------------------------------------------------
# TRANSLATION FUNCTION
# ---------------------------------------------------------

def translate_answer(answer, language):

    # English does not require translation
    if language.lower() == "english":
        return answer

    try:

        # Telugu translation
        if language.lower() == "telugu":

            return GoogleTranslator(
                source="auto",
                target="te"
            ).translate(answer)


        # Hindi translation
        if language.lower() == "hindi":

            return GoogleTranslator(
                source="auto",
                target="hi"
            ).translate(answer)


        # Unknown language
        return answer


    except Exception as error:

        # -------------------------------------------------
        # IMPORTANT:
        # Translation failure must NOT crash the API.
        # -------------------------------------------------

        print("Translation error:", error)

        print("Returning original English answer.")

        return answer


# ---------------------------------------------------------
# CHAT ENDPOINT
# ---------------------------------------------------------

@app.post("/chat")
def chat(request: ChatRequest):

    # Get user question
    question = request.message


    # -----------------------------------------------------
    # GENERATE RAG ANSWER
    # -----------------------------------------------------

    result = generate_answer(question)


    # -----------------------------------------------------
    # TRANSLATE ANSWER
    # -----------------------------------------------------

    translated_answer = translate_answer(
        result["answer"],
        request.language
    )


    # -----------------------------------------------------
    # RETURN API RESPONSE
    # -----------------------------------------------------

    return {

        "answer": translated_answer,

        "sources": result["sources"],

        "emergency": result["emergency"],

        "language": request.language
    }