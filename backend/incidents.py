# ============================================================
# NARI-SHIELD AI - INCIDENT HISTORY MODULE
# ============================================================

# This module stores incident history in MongoDB Atlas.
#
# Data flow:
#
# FastAPI
#     ↓
# incidents.py
#     ↓
# MongoDB Atlas
#     ↓
# incidents collection


# ============================================================
# IMPORTS
# ============================================================

from datetime import datetime

from backend.database import incidents_collection


# ============================================================
# ADD INCIDENT
# ============================================================

def add_incident(
    situation,
    risk_type,
    severity,
    location,
    sos_status
):
    """
    Add a new safety incident to MongoDB.
    """

    incident = {
        "situation": situation,
        "risk_type": risk_type,
        "severity": severity,
        "location": location,
        "sos_status": sos_status,
        "created_at": datetime.now().isoformat()
    }

    # Insert the incident into MongoDB.
    result = incidents_collection.insert_one(incident)

    # Return the MongoDB ID as a string.
    incident["incident_id"] = str(result.inserted_id)

    return {
        "message": "Incident recorded successfully",
        "incident": incident
    }


# ============================================================
# GET INCIDENTS
# ============================================================

def get_incidents():
    """
    Retrieve all incidents from MongoDB.
    """

    incidents = list(
        incidents_collection.find({})
    )

    # Convert MongoDB ObjectId to string
    # so FastAPI can return it as JSON.
    for incident in incidents:

        incident["incident_id"] = str(
            incident["_id"]
        )

        del incident["_id"]

    return incidents


# ============================================================
# CLEAR INCIDENT HISTORY
# ============================================================

def clear_incidents():
    """
    Delete all incidents from MongoDB.
    """

    result = incidents_collection.delete_many({})

    return {
        "message": "Incident history cleared successfully",
        "deleted_count": result.deleted_count
    }


# ============================================================
# TEST MODULE
# ============================================================

if __name__ == "__main__":

    print(
        "Testing Incident History MongoDB module..."
    )

    # --------------------------------------------------------
    # ADD TEST INCIDENT
    # --------------------------------------------------------

    result = add_incident(
        situation="Someone is following me.",
        risk_type="public safety / stalking",
        severity="medium",
        location={
            "latitude": 16.9891,
            "longitude": 82.2475
        },
        sos_status="not triggered"
    )

    print("\nAdded Incident:")
    print(result)


    # --------------------------------------------------------
    # GET INCIDENTS
    # --------------------------------------------------------

    print("\nIncident History:")

    incidents = get_incidents()

    print(incidents)


    # --------------------------------------------------------
    # CLEAR TEST INCIDENTS
    # --------------------------------------------------------

    result = clear_incidents()

    print("\nAfter Clearing:")
    print(result)


    # --------------------------------------------------------
    # VERIFY CLEARING
    # --------------------------------------------------------

    print("\nIncident History After Clearing:")

    print(
        get_incidents()
    )