# ============================================================
# NARI-SHIELD AI - SAFETY WORD MODULE
# ============================================================

# This module stores and checks the user's custom safety word.
#
# Data flow:
#
# FastAPI
#     ↓
# safety_word.py
#     ↓
# MongoDB Atlas
#     ↓
# safety_settings collection


# ============================================================
# IMPORT MONGODB COLLECTION
# ============================================================

from backend.database import safety_settings_collection


# ============================================================
# SET SAFETY WORD
# ============================================================

def set_safety_word(word):
    """
    Save or update the user's safety word in MongoDB.
    """

    # Remove unnecessary spaces.
    word = word.strip()

    # Convert the safety word to lowercase
    # so that checking is not case-sensitive.
    word = word.lower()

    # Store the safety word in MongoDB.
    safety_settings_collection.update_one(
        {},
        {
            "$set": {
                "safety_word": word
            }
        },
        upsert=True
    )

    return {
        "message": "Safety word saved successfully",
        "safety_word": word
    }


# ============================================================
# GET SAFETY WORD
# ============================================================

def get_safety_word():
    """
    Retrieve the saved safety word from MongoDB.
    """

    settings = safety_settings_collection.find_one({})

    # No safety word has been configured.
    if settings is None:
        return None

    return settings.get("safety_word")


# ============================================================
# CHECK SAFETY WORD
# ============================================================

def check_safety_word(message):
    """
    Check whether the user's safety word
    appears inside a message.
    """

    safety_word = get_safety_word()

    # Safety word has not been configured.
    if safety_word is None:
        return {
            "detected": False,
            "sos_recommended": False,
            "message": (
                "Safety word has not been configured."
            )
        }

    # Convert message to lowercase.
    message = message.lower()

    # Check whether the safety word exists in the message.
    if safety_word in message:

        return {
            "detected": True,
            "sos_recommended": True,
            "message": (
                "Safety word detected. "
                "SOS flow can be started."
            )
        }

    return {
        "detected": False,
        "sos_recommended": False,
        "message": "Safety word not detected."
    }


# ============================================================
# TEST MODULE
# ============================================================

if __name__ == "__main__":

    print(
        "Testing Safety Word MongoDB module..."
    )

    # --------------------------------------------------------
    # SAVE TEST SAFETY WORD
    # --------------------------------------------------------

    result = set_safety_word("Amma")

    print("\nSafety Word Saved:")
    print(result)


    # --------------------------------------------------------
    # GET SAFETY WORD
    # --------------------------------------------------------

    print("\nSaved Safety Word:")

    print(
        get_safety_word()
    )


    # --------------------------------------------------------
    # TEST DETECTION
    # --------------------------------------------------------

    print("\nSafety Word Check:")

    result = check_safety_word(
        "Amma please help me"
    )

    print(result)


    # --------------------------------------------------------
    # TEST NON-DETECTION
    # --------------------------------------------------------

    print("\nSecond Safety Word Check:")

    result = check_safety_word(
        "I am going home"
    )

    print(result)