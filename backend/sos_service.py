# ============================================================
# NARI-SHIELD AI - SOS SERVICE MODULE
# ============================================================

# This module prepares the SOS information.
#
# Data flow:
#
# User
#   ↓
# SOS request
#   ↓
# sos_service.py
#   ├── Trusted Contacts → MongoDB
#   └── Latest Location  → MongoDB
#   ↓
# SOS Package
#
# IMPORTANT:
# This module only prepares the SOS package.
# It does NOT automatically send messages or make calls.


# ============================================================
# IMPORT MODULES
# ============================================================

from backend.contacts import get_contacts
from backend.location import get_location


# ============================================================
# PREPARE SOS
# ============================================================

def prepare_sos(situation=None):
    """
    Prepare all information required for an SOS action.

    The latest location and trusted contacts are retrieved
    from their respective MongoDB-backed modules.
    """

    # --------------------------------------------------------
    # GET LATEST LOCATION
    # --------------------------------------------------------

    location = get_location()


    # --------------------------------------------------------
    # GET TRUSTED CONTACTS
    # --------------------------------------------------------

    contacts = get_contacts()


    # --------------------------------------------------------
    # CHECK CONTACT STATUS
    # --------------------------------------------------------

    if len(contacts) == 0:

        contact_status = (
            "No trusted contacts are configured."
        )

    else:

        contact_status = (
            f"{len(contacts)} trusted contact(s) available."
        )


    # --------------------------------------------------------
    # CHECK LOCATION STATUS
    # --------------------------------------------------------

    if location is None:

        location_status = (
            "No location is currently available."
        )

    else:

        location_status = (
            "Latest location is available."
        )


    # --------------------------------------------------------
    # CREATE SOS PACKAGE
    # --------------------------------------------------------

    sos_package = {

        "sos_ready": True,

        "situation": situation,

        "location": location,

        "location_status": location_status,

        "trusted_contacts": contacts,

        "contact_status": contact_status,

        "notification_status": (
            "SOS prepared. "
            "User confirmation is required before "
            "any external notification."
        )
    }


    # --------------------------------------------------------
    # RETURN SOS PACKAGE
    # --------------------------------------------------------

    return sos_package


# ============================================================
# TEST MODULE
# ============================================================

if __name__ == "__main__":

    print(
        "Testing SOS Service MongoDB integration..."
    )


    # --------------------------------------------------------
    # PREPARE TEST SOS
    # --------------------------------------------------------

    result = prepare_sos(
        situation="Someone is following me."
    )


    # --------------------------------------------------------
    # DISPLAY RESULT
    # --------------------------------------------------------

    print("\nSOS PACKAGE:")

    print(result)