# ============================================================
# NARI-SHIELD AI - MONGODB ATLAS CONNECTION
# ============================================================

# This file connects our Python/FastAPI backend
# to MongoDB Atlas.
#
# Connection flow:
#
# FastAPI
#     ↓
# database.py
#     ↓
# PyMongo
#     ↓
# MongoDB Atlas
#
# The MongoDB connection string is stored in .env
# so that we do not put the password directly in our code.


# ============================================================
# IMPORT LIBRARIES
# ============================================================

from pymongo import MongoClient
from dotenv import load_dotenv
import os


# ============================================================
# LOAD .ENV FILE
# ============================================================

# Read the MONGO_URL variable from the .env file.

load_dotenv()


# ============================================================
# GET MONGODB CONNECTION STRING
# ============================================================

MONGO_URL = os.getenv("MONGO_URL")


# ============================================================
# CHECK CONNECTION STRING
# ============================================================

if not MONGO_URL:
    raise ValueError(
        "MONGO_URL was not found in the .env file."
    )


# ============================================================
# CREATE MONGODB CLIENT
# ============================================================

client = MongoClient(MONGO_URL)


# ============================================================
# SELECT DATABASE
# ============================================================

# Our project database is called nari_shield.

db = client["nari_shield"]


# ============================================================
# TRUSTED CONTACTS COLLECTION
# ============================================================

# Stores the user's trusted contacts.

contacts_collection = db["trusted_contacts"]


# ============================================================
# INCIDENTS COLLECTION
# ============================================================

# Stores the user's safety incident history.

incidents_collection = db["incidents"]


# ============================================================
# SAFETY SETTINGS COLLECTION
# ============================================================

# Stores the user's custom safety word
# and other safety-related settings.

safety_settings_collection = db["safety_settings"]


# ============================================================
# LOCATION COLLECTION
# ============================================================

# Stores the user's latest location.

location_collection = db["location"]


# ============================================================
# TEST DATABASE CONNECTION
# ============================================================

def test_database_connection():
    """
    Test whether MongoDB Atlas is reachable.
    """

    try:

        # Send a ping request to MongoDB Atlas.
        client.admin.command("ping")

        print(
            "MongoDB Atlas connected successfully!"
        )

        print(
            "Database:",
            db.name
        )

        print(
            "Trusted contacts collection is ready!"
        )

        print(
            "Incidents collection is ready!"
        )

        print(
            "Safety settings collection is ready!"
        )

        print(
            "Location collection is ready!"
        )

        return True

    except Exception as error:

        print(
            "MongoDB Atlas connection failed!"
        )

        print(
            "Error:",
            error
        )

        return False


# ============================================================
# TEST THE CONNECTION
# ============================================================

if __name__ == "__main__":

    test_database_connection()