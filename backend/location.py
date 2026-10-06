from backend.database import location_collection


# Save or update location for a specific user
def update_location(user_id, latitude, longitude):
    location = {
        "user_id": user_id,
        "latitude": latitude,
        "longitude": longitude
    }

    location_collection.update_one(
        {"user_id": user_id},
        {"$set": location},
        upsert=True
    )

    return {
        "message": "Location updated successfully",
        "location": {
            "latitude": latitude,
            "longitude": longitude
        }
    }


# Get location for a specific user
def get_location(user_id):
    location = location_collection.find_one(
        {"user_id": user_id}
    )

    if location is None:
        return None

    location.pop("_id", None)
    location.pop("user_id", None)

    return location


# Clear location for a specific user
def clear_location(user_id):
    result = location_collection.delete_one(
        {"user_id": user_id}
    )

    return {
        "message": "Location cleared successfully",
        "deleted": result.deleted_count > 0
    }