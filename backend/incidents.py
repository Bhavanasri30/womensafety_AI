from backend.database import incidents_collection
from datetime import datetime


# Add an incident for a specific user
def add_incident(
    user_id,
    situation,
    risk_type,
    severity,
    location,
    sos_status
):
    incident = {
        "user_id": user_id,
        "situation": situation,
        "risk_type": risk_type,
        "severity": severity,
        "location": location,
        "sos_status": sos_status,
        "created_at": datetime.now().isoformat()
    }

    result = incidents_collection.insert_one(incident)

    incident["incident_id"] = str(result.inserted_id)

    return {
        "message": "Incident recorded successfully",
        "incident": incident
    }


# Get only the authenticated user's incidents
def get_incidents(user_id):
    incidents = list(
        incidents_collection.find(
            {"user_id": user_id}
        )
    )

    for incident in incidents:
        incident["incident_id"] = str(incident["_id"])
        del incident["_id"]

    return incidents


# Delete only the authenticated user's incidents
def clear_incidents(user_id):
    result = incidents_collection.delete_many(
        {"user_id": user_id}
    )

    return {
        "message": "Incident history cleared successfully",
        "deleted_count": result.deleted_count
    }