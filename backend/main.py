# ============================================================
# NARI-SHIELD AI - FASTAPI BACKEND
# ============================================================

# This file contains the main API endpoints
# for the Nari-Shield AI backend.
#
# Main modules:
# 1. ML situation analysis
# 2. SOS decision
# 3. Trusted contacts
# 4. Safety word
# 5. Location
# 6. SOS preparation
# 7. Incident history
# 8. Confirmed SOS + incident recording


# ============================================================
# IMPORT LIBRARIES
# ============================================================

from fastapi import FastAPI
from pydantic import BaseModel
import joblib


# ============================================================
# IMPORT PROJECT MODULES
# ============================================================

from backend.sos import get_sos_decision

from backend.contacts import (
    add_contact,
    get_contacts,
    remove_contact
)

from backend.safety_word import (
    set_safety_word,
    get_safety_word,
    check_safety_word
)

from backend.sos_service import prepare_sos

from backend.location import (
    update_location,
    get_location,
    clear_location
)

from backend.incidents import (
    add_incident,
    get_incidents,
    clear_incidents
)


# ============================================================
# CREATE FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Nari-Shield AI API",
    description="AI-powered women safety analysis backend",
    version="1.0.0"
)


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

class SituationRequest(BaseModel):
    """
    Request model for situation analysis.
    """

    situation: str


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

    The user confirms that the SOS should be recorded.
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
        "ml_models": "loaded successfully"
    }


# ============================================================
# ML SITUATION ANALYSIS
# ============================================================

@app.post("/analyze")
def analyze_situation(request: SituationRequest):
    """
    Analyze a user's situation using the ML models.

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

    risk_probabilities = (
        risk_model.predict_proba(
            risk_features
        )
    )

    risk_confidence = (
        risk_probabilities.max()
    )


    # --------------------------------------------------------
    # SEVERITY PREDICTION
    # --------------------------------------------------------

    severity_features = (
        severity_vectorizer.transform(
            [request.situation]
        )
    )

    severity = severity_model.predict(
        severity_features
    )[0]

    severity_probabilities = (
        severity_model.predict_proba(
            severity_features
        )
    )

    severity_confidence = (
        severity_probabilities.max()
    )


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
# TRUSTED CONTACTS
# ============================================================

@app.post("/contacts")
def create_contact(
    request: ContactRequest
):
    """
    Add a trusted contact.
    """

    return add_contact(
        request.name,
        request.phone,
        request.relationship
    )


@app.get("/contacts")
def read_contacts():
    """
    Get all trusted contacts.
    """

    return {
        "contacts": get_contacts()
    }


@app.delete("/contacts/{phone}")
def delete_contact(phone: str):
    """
    Delete a trusted contact.
    """

    return remove_contact(phone)


# ============================================================
# SAFETY WORD
# ============================================================

@app.post("/safety-word")
def create_safety_word(
    request: SafetyWordRequest
):
    """
    Save or update the user's safety word.
    """

    result = set_safety_word(
        request.word
    )

    return {
        "message": result["message"]
    }


@app.get("/safety-word")
def safety_word_status():
    """
    Check whether a safety word is configured.
    """

    word = get_safety_word()

    return {
        "configured": word is not None
    }


@app.post("/safety-word/check")
def check_message_for_safety_word(
    request: SafetyMessageRequest
):
    """
    Check whether a message contains
    the configured safety word.
    """

    return check_safety_word(
        request.message
    )


# ============================================================
# LOCATION
# ============================================================

@app.post("/location")
def save_location(
    request: LocationRequest
):
    """
    Save or update the user's latest location.
    """

    return update_location(
        request.latitude,
        request.longitude
    )


@app.get("/location")
def read_location():
    """
    Get the latest stored location.
    """

    return {
        "location": get_location()
    }


@app.delete("/location")
def delete_location():
    """
    Clear the stored location.
    """

    return clear_location()


# ============================================================
# SOS PREPARATION
# ============================================================

@app.post("/sos/prepare")
def prepare_sos_request(
    request: SOSRequest
):
    """
    Prepare an SOS package.

    This does NOT send an external notification.
    """

    return prepare_sos(
        situation=request.situation
    )


# ============================================================
# MANUAL INCIDENT RECORDING
# ============================================================

@app.post("/incidents")
def create_incident(
    request: IncidentRequest
):
    """
    Manually record an incident in MongoDB.
    """

    return add_incident(
        situation=request.situation,
        risk_type=request.risk_type,
        severity=request.severity,
        location=request.location,
        sos_status=request.sos_status
    )


@app.get("/incidents")
def read_incidents():
    """
    Retrieve incident history.
    """

    return {
        "incidents": get_incidents()
    }


@app.delete("/incidents")
def delete_incidents():
    """
    Clear incident history.
    """

    return clear_incidents()


# ============================================================
# CONFIRM SOS
# ============================================================

@app.post("/sos/confirm")
def confirm_sos(
    request: ConfirmSOSRequest
):
    """
    Confirm an SOS and record the incident.

    The user's latest MongoDB location is included
    automatically.

    IMPORTANT:
    This endpoint records the confirmed SOS.
    It does NOT send real SMS/calls yet.
    """

    # --------------------------------------------------------
    # GET LATEST LOCATION
    # --------------------------------------------------------

    location = get_location()


    # --------------------------------------------------------
    # PREPARE SOS INFORMATION
    # --------------------------------------------------------

    sos_package = prepare_sos(
        situation=request.situation
    )


    # --------------------------------------------------------
    # RECORD INCIDENT
    # --------------------------------------------------------

    incident_result = add_incident(
        situation=request.situation,
        risk_type=request.risk_type,
        severity=request.severity,
        location=location,
        sos_status="confirmed"
    )


    # --------------------------------------------------------
    # RETURN COMPLETE RESULT
    # --------------------------------------------------------

    return {
        "message": "SOS confirmed and incident recorded.",

        "sos": sos_package,

        "incident": incident_result["incident"]
    }
