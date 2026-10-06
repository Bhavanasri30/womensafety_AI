from backend.database import safety_settings_collection


# Set safety word for a specific user
def set_safety_word(user_id, word):
    word = word.strip().lower()

    safety_settings_collection.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "user_id": user_id,
                "safety_word": word
            }
        },
        upsert=True
    )

    return {
        "message": "Safety word saved successfully"
    }


# Get safety word for a specific user
def get_safety_word(user_id):
    settings = safety_settings_collection.find_one(
        {"user_id": user_id}
    )

    if settings is None:
        return None

    return settings.get("safety_word")


# Check message using the user's safety word
def check_safety_word(user_id, message):
    safety_word = get_safety_word(user_id)

    if safety_word is None:
        return {
            "detected": False,
            "sos_recommended": False,
            "message": "Safety word has not been configured."
        }

    message = message.lower()

    if safety_word in message:
        return {
            "detected": True,
            "sos_recommended": True,
            "message": "Safety word detected. SOS flow can be started."
        }

    return {
        "detected": False,
        "sos_recommended": False,
        "message": "Safety word not detected."
    }