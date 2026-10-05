from fastapi import FastAPI
from pydantic import BaseModel
from deep_translator import GoogleTranslator

from rag.rag_answer import generate_answer


app = FastAPI(
    title="Nari-Shield RAG API",
    description="AI Safety Chatbot API",
    version="1.0"
)


class ChatRequest(BaseModel):
    message: str
    language: str = "english"


def translate_answer(answer, language):
    """
    Translate the RAG answer into the user's selected language.
    """

    if language.lower() == "english":
        return answer

    try:
        if language.lower() == "telugu":
            return GoogleTranslator(
                source="auto",
                target="te"
            ).translate(answer)

        if language.lower() == "hindi":
            return GoogleTranslator(
                source="auto",
                target="hi"
            ).translate(answer)

        return answer

    except Exception as error:
        print("Translation error:", error)
        print("Returning original English answer.")
        return answer


@app.post("/chat")
def chat(request: ChatRequest):

    # Get the user's question
    question = request.message

    # Generate answer using RAG
    result = generate_answer(question)

    # Translate the generated answer
    translated_answer = translate_answer(
        result["answer"],
        request.language
    )

    return {
        "answer": translated_answer,
        "sources": result["sources"],
        "emergency": result["emergency"],
        "language": request.language
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "rag.rag_api:app",
        host="127.0.0.1",
        port=8001,
        reload=True
    )