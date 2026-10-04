# ============================================================
# NARI-SHIELD AI - LOCATION MODULE
# ============================================================

# This module stores the user's latest location in MongoDB.
#
# Data flow:
#
# FastAPI
#     ↓
# location.py
#     ↓
# MongoDB Atlas
#     ↓
# location collection


# ============================================================
# IMPORT MONGODB COLLECTION
# ============================================================

from backend.database import location_collection


# ============================================================
# UPDATE LOCATION
# ============================================================

def update_location(latitude, longitude):
    """
    Save or update the user's latest location.
    """

    location = {
        "latitude": latitude,
        "longitude": longitude
    }

    # There should be only one latest location.
    # update_one() with upsert=True creates the document
    # if it does not already exist.
    location_collection.update_one(
        {},
        {
            "$set": location
        },
        upsert=True
    )

    return {
        "message": "Location updated successfully",
        "location": location
    }


# ============================================================
# GET LOCATION
# ============================================================

def get_location():
    """
    Retrieve the user's latest location from MongoDB.
    """

    location = location_collection.find_one({})

    # No location has been saved yet.
    if location is None:
        return None

    # Remove MongoDB's internal ID before returning.
    location.pop("_id", None)

    return location


# ============================================================
# CLEAR LOCATION
# ============================================================

def clear_location():
    """
    Remove the stored location from MongoDB.
    """

    location_collection.delete_many({})

    return {
        "message": "Location cleared successfully"
    }


# ============================================================
# TEST MODULE
# ============================================================

if __name__ == "__main__":

    print(
        "Testing Location MongoDB module..."
    )

    # --------------------------------------------------------
    # SAVE TEST LOCATION
    # --------------------------------------------------------

    result = update_location(
        16.9891,
        82.2475
    )

    print("\nLocation Update:")
    print(result)


    # --------------------------------------------------------
    # GET LOCATION
    # --------------------------------------------------------

    print("\nLatest Location:")

    print(
        get_location()
    )


    # --------------------------------------------------------
    # CLEAR LOCATION
    # --------------------------------------------------------

    result = clear_location()

    print("\nClear Location:")
    print(result)


    # --------------------------------------------------------
    # VERIFY CLEARING
    # --------------------------------------------------------

    print("\nLocation After Clearing:")

    print(
        get_location()
    )