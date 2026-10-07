from backend.contacts import get_contacts
from backend.location import get_location


def prepare_sos(user_id, situation=None):
    """
    Prepare an SOS package for the authenticated user.

    The backend prepares the emergency information.
    The user's phone will handle SMS/call actions.
    """

    # Get user's latest location
    location = get_location(user_id)

    # Get user's trusted contacts
    contacts = get_contacts(user_id)

    # --------------------------------------------------------
    # LOCATION
    # --------------------------------------------------------

    if location is None:
        location_status = "No location is currently available."
        location_link = None
    else:
        latitude = location.get("latitude")
        longitude = location.get("longitude")

        location_status = "Latest location is available."

        location_link = (
            f"https://www.google.com/maps?q={latitude},{longitude}"
        )

    # --------------------------------------------------------
    # CONTACTS
    # --------------------------------------------------------

    if len(contacts) == 0:
        contact_status = "No trusted contacts are configured."
    else:
        contact_status = (
            f"{len(contacts)} trusted contact(s) available."
        )

    # --------------------------------------------------------
    # EMERGENCY MESSAGE
    # --------------------------------------------------------

    emergency_message = (
        "🚨 NARI-SHIELD SOS ALERT\n\n"
        "I need help. This is an emergency alert from Nari-Shield.\n\n"
    )

    if situation:
        emergency_message += (
            f"Emergency message:\n{situation}\n\n"
        )

    if location_link:
        emergency_message += (
            f"My current location:\n{location_link}\n\n"
        )
    else:
        emergency_message += (
            "My current location is currently unavailable.\n\n"
        )

    emergency_message += (
        "Please contact me immediately."
    )

    # --------------------------------------------------------
    # RETURN SOS PACKAGE
    # --------------------------------------------------------

    return {
        "sos_ready": True,
        "situation": situation,
        "location": location,
        "location_status": location_status,
        "location_link": location_link,
        "trusted_contacts": contacts,
        "contact_status": contact_status,
        "emergency_message": emergency_message,
        "notification_status": (
            "Emergency message prepared. "
            "The user's phone will handle communication."
        )
    }