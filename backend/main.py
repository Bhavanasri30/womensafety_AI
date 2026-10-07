# ============================================================
# NARI-SHIELD AI - FASTAPI BACKEND
# ============================================================

"""
Main backend for the Nari-Shield AI system.

Modules:
1. User registration
2. User login
3. JWT authentication
4. ML situation analysis
5. RAG safety chatbot
6. SOS decision
7. Trusted contacts
8. Safety word
9. Location
10. SOS preparation
11. Incident history
12. Confirmed SOS
"""

# ============================================================
# IMPORT LIBRARIES
# ============================================================

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware


# ============================================================
# IMPORT PROJECT MODULES
# ============================================================

# Authentication
from backend.auth import (
    register_user,
    login_user,
    verify_access_token
)

# ML + SOS
from backend.sos import get_sos_decision

# Trusted contacts
from backend.contacts import (
    add_contact,
    get_contacts,
    remove_contact
)

# Safety word
from backend.safety_word import (
    set_safety_word,
    get_safety_word,
    check_safety_word
)

# SOS preparation
from backend.sos_service import prepare_sos

# Location
from backend.location import (
    update_location,
    get_location,
    clear_location
)

# Incidents
from backend.incidents import (
    add_incident,
    get_incidents,
    clear_incidents
)

# RAG
from rag.rag_answer import generate_answer


# ============================================================
# JWT SECURITY
# ============================================================

security = HTTPBearer()


# ============================================================
# CREATE FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Nari-Shield AI API",
    description="AI-powered women safety analysis backend",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

# Allow frontend applications from any origin.
# Authentication uses JWT in the Authorization header,
# so browser credentials/cookies are not required.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# JWT CURRENT USER FUNCTION
# ============================================================

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Verify the JWT token sent by the user.

    If the token is valid:
        return the user_id.

    If the token is invalid:
        return HTTP 401 error.
    """

    token = credentials.credentials

    user_id = verify_access_token(token)

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired authentication token."
        )

    return user_id


# ============================================================
# LOAD ML MODELS
# ============================================================

# Risk classification model
risk_model = joblib.load(
    "models/risk_model.pkl"
)

# Risk TF-IDF vectorizer
risk_vectorizer = joblib.load(
    "models/risk_vectorizer.pkl"
)

# Severity classification model
severity_model = joblib.load(
    "models/severity_model.pkl"
)

# Severity TF-IDF vectorizer
severity_vectorizer = joblib.load(
    "models/severity_vectorizer.pkl"
)


# ============================================================
# REQUEST MODELS
# ============================================================

class RegisterRequest(BaseModel):
    """
    Request model for user registration.
    """

    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    """
    Request model for user login.
    """

    email: str
    password: str


class SituationRequest(BaseModel):
    """
    Request model for ML situation analysis.
    """

    situation: str


class ChatRequest(BaseModel):
    """
    Request model for the RAG chatbot.

    message -> user's question
    language -> desired answer language
    """

    message: str
    language: str = "english"


class ContactRequest(BaseModel):
    """
    Request model for trusted contacts.
    """

    name: str
    phone: str
    relationship: str


class SafetyWordRequest(BaseModel):
    """
    Request model for setting safety word.
    """

    word: str


class SafetyMessageRequest(BaseModel):
    """
    Request model for checking safety word.
    """

    message: str


class SOSRequest(BaseModel):
    """
    Request model for preparing an SOS.
    """

    situation: str


class LocationRequest(BaseModel):
    """
    Request model for location.
    """

    latitude: float
    longitude: float


class IncidentRequest(BaseModel):
    """
    Request model for manually recording an incident.
    """

    situation: str
    risk_type: str
    severity: str
    location: dict | None = None
    sos_status: str


class ConfirmSOSRequest(BaseModel):
    """
    Request model for confirming an SOS.
    """

    situation: str
    risk_type: str
    severity: str


# ============================================================
# HOME ENDPOINT
# ============================================================

@app.get("/")
def home():
    """
    Check whether the backend is running.
    """

    return {
        "message": "Nari-Shield AI backend is running!",
        "ml_models": "loaded successfully",
        "rag": "loaded successfully",
        "authentication": "loaded successfully"
    }


# ============================================================
# USER REGISTRATION
# ============================================================

@app.post("/register")
def register(request: RegisterRequest):
    """
    Register a new user.

    The password is hashed inside auth.py
    before being stored in MongoDB.
    """

    return register_user(
        name=request.name,
        email=request.email,
        password=request.password
    )


# ============================================================
# USER LOGIN
# ============================================================

@app.post("/login")
def login(request: LoginRequest):
    """
    Authenticate an existing user.

    The password is checked against
    the stored password hash.

    If successful, a JWT token is returned.
    """

    return login_user(
        email=request.email,
        password=request.password
    )


# ============================================================
# JWT TEST ENDPOINT
# ============================================================

@app.get("/auth/me")
def get_logged_in_user(
    user_id: str = Depends(get_current_user)
):
    """
    Test JWT authentication.

    This endpoint requires a valid JWT token.

    If the token is valid, the user's ID
    is returned.
    """

    return {
        "message": "Authentication successful.",
        "user_id": user_id
    }


# ============================================================
# ML SITUATION ANALYSIS
# ============================================================

@app.post("/analyze")
def analyze_situation(
    request: SituationRequest
):
    """
    Analyze a user's situation using ML.

    Returns:
    - risk type
    - risk confidence
    - severity
    - severity confidence
    - SOS recommendation
    """

    # --------------------------------------------------------
    # RISK TYPE PREDICTION
    # --------------------------------------------------------

    risk_features = risk_vectorizer.transform(
        [request.situation]
    )

    risk_type = risk_model.predict(
        risk_features
    )[0]

    risk_probabilities = risk_model.predict_proba(
        risk_features
    )

    risk_confidence = risk_probabilities.max()

    # --------------------------------------------------------
    # SEVERITY PREDICTION
    # --------------------------------------------------------

    severity_features = severity_vectorizer.transform(
        [request.situation]
    )

    severity = severity_model.predict(
        severity_features
    )[0]

    severity_probabilities = severity_model.predict_proba(
        severity_features
    )

    severity_confidence = severity_probabilities.max()

    # --------------------------------------------------------
    # SOS DECISION
    # --------------------------------------------------------

    sos_decision = get_sos_decision(
        risk_type,
        severity
    )

    # --------------------------------------------------------
    # RETURN RESULT
    # --------------------------------------------------------

    return {
        "situation": request.situation,
        "risk_type": risk_type,
        "risk_confidence": round(
            risk_confidence * 100,
            2
        ),
        "severity": severity,
        "severity_confidence": round(
            severity_confidence * 100,
            2
        ),
        "sos": sos_decision
    }


# ============================================================
# RAG AI SAFETY CHATBOT
# ============================================================

@app.post("/chat")
def chat(request: ChatRequest):
    """
    Generate a safety answer using the RAG pipeline.

    Flow:

    User question
          ↓
    FAISS retrieval
          ↓
    Safety knowledge
          ↓
    Groq LLM
          ↓
    Answer
          ↓
    Translation
    """

    # --------------------------------------------------------
    # GENERATE RAG ANSWER
    # --------------------------------------------------------

    result = generate_answer(
        request.message
    )

    # --------------------------------------------------------
    # TRANSLATE ANSWER
    # --------------------------------------------------------

    translated_answer = result["answer"]

    if request.language.lower() != "english":

        try:
            from deep_translator import GoogleTranslator

            # Telugu
            if request.language.lower() == "telugu":

                translated_answer = (
                    GoogleTranslator(
                        source="auto",
                        target="te"
                    ).translate(
                        result["answer"]
                    )
                )

            # Hindi
            elif request.language.lower() == "hindi":

                translated_answer = (
                    GoogleTranslator(
                        source="auto",
                        target="hi"
                    ).translate(
                        result["answer"]
                    )
                )

        except Exception as error:

            print(
                "Translation error:",
                error
            )

            translated_answer = result["answer"]

    # --------------------------------------------------------
    # RETURN RAG RESPONSE
    # --------------------------------------------------------

    return {
        "answer": translated_answer,
        "sources": result["sources"],
        "emergency": result["emergency"],
        "language": request.language
    }


# ============================================================
# TRUSTED CONTACTS
# ============================================================

@app.post("/contacts")
def create_contact(
    request: ContactRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Add a trusted contact for the authenticated user.
    """

    return add_contact(
        user_id,
        request.name,
        request.phone,
        request.relationship
    )


@app.get("/contacts")
def read_contacts(
    user_id: str = Depends(get_current_user)
):
    """
    Get only the authenticated user's trusted contacts.
    """

    return {
        "contacts": get_contacts(user_id)
    }


@app.delete("/contacts/{phone}")
def delete_contact(
    phone: str,
    user_id: str = Depends(get_current_user)
):
    """
    Delete only the authenticated user's trusted contact.
    """

    return remove_contact(
        user_id,
        phone
    )


# ============================================================
# SAFETY WORD
# ============================================================

@app.post("/safety-word")
def create_safety_word(
    request: SafetyWordRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Save or update the authenticated user's safety word.
    """

    result = set_safety_word(
        user_id,
        request.word
    )

    return {
        "message": result["message"]
    }


@app.get("/safety-word")
def safety_word_status(
    user_id: str = Depends(get_current_user)
):
    """
    Check whether the authenticated user
    has configured a safety word.
    """

    word = get_safety_word(user_id)

    return {
        "configured": word is not None
    }


@app.post("/safety-word/check")
def check_message_for_safety_word(
    request: SafetyMessageRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Check whether a message contains
    the authenticated user's safety word.
    """

    return check_safety_word(
        user_id,
        request.message
    )


# ============================================================
# LOCATION
# ============================================================

@app.post("/location")
def save_location(
    request: LocationRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Save or update the authenticated user's latest location.
    """

    return update_location(
        user_id,
        request.latitude,
        request.longitude
    )


@app.get("/location")
def read_location(
    user_id: str = Depends(get_current_user)
):
    """
    Get the authenticated user's latest stored location.
    """

    return {
        "location": get_location(user_id)
    }


@app.delete("/location")
def delete_location(
    user_id: str = Depends(get_current_user)
):
    """
    Clear the authenticated user's stored location.
    """

    return clear_location(user_id)


# ============================================================
# INCIDENT RECORDING
# ============================================================

@app.post("/incidents")
def create_incident(
    request: IncidentRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Manually record an incident for the authenticated user.
    """

    return add_incident(
        user_id=user_id,
        situation=request.situation,
        risk_type=request.risk_type,
        severity=request.severity,
        location=request.location,
        sos_status=request.sos_status
    )


@app.get("/incidents")
def read_incidents(
    user_id: str = Depends(get_current_user)
):
    """
    Retrieve only the authenticated user's incident history.
    """

    return {
        "incidents": get_incidents(user_id)
    }


@app.delete("/incidents")
def delete_incidents(
    user_id: str = Depends(get_current_user)
):
    """
    Clear only the authenticated user's incident history.
    """

    return clear_incidents(user_id)


# ============================================================
# SOS PREPARATION
# ============================================================

@app.post("/sos/prepare")
def prepare_sos_request(
    request: SOSRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Prepare an SOS package for the authenticated user.

    This does NOT send an external notification.
    """

    return prepare_sos(
        user_id=user_id,
        situation=request.situation
    )


# ============================================================
# CONFIRM SOS
# ============================================================

@app.post("/sos/confirm")
def confirm_sos(
    request: ConfirmSOSRequest,
    user_id: str = Depends(get_current_user)
):
    """
    Confirm and record an SOS for the authenticated user.

    This does NOT send SMS, calls, or external notifications.
    """

    location = get_location(user_id)

    sos_package = prepare_sos(
        user_id=user_id,
        situation=request.situation
    )

    incident = add_incident(
        user_id=user_id,
        situation=request.situation,
        risk_type=request.risk_type,
        severity=request.severity,
        location=location,
        sos_status="confirmed"
    )

    return {
        "sos": sos_package,
        "incident": incident
    }