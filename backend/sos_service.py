from backend.contacts import get_contacts
from backend.location import get_location


def prepare_sos(user_id, situation=None):
    """
    Prepare an SOS package for the authenticated user.

    This function does not send SMS, calls,
    or any external emergency notification.
    """

    # Get this user's latest location
    location = get_location(user_id)

    # Get this user's trusted contacts
    contacts = get_contacts(user_id)

    # Check trusted contacts
    if len(contacts) == 0:
        contact_status = "No trusted contacts are configured."
    else:
        contact_status = (
            f"{len(contacts)} trusted contact(s) available."
        )

    # Check location
    if location is None:
        location_status = "No location is currently available."
    else:
        location_status = "Latest location is available."

    return {
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