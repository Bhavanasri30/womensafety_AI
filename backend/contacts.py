# ============================================================
# NARI-SHIELD AI - TRUSTED CONTACTS MODULE
# ============================================================

# This module stores trusted contacts in MongoDB Atlas
# instead of temporary Python memory.


# ============================================================
# IMPORT MONGODB COLLECTION
# ============================================================

from backend.database import contacts_collection


# ============================================================
# ADD TRUSTED CONTACT
# ============================================================

def add_contact(name, phone, relationship):
    """
    Add a trusted contact to MongoDB.
    """

    contact = {
        "name": name,
        "phone": phone,
        "relationship": relationship
    }

    # Insert the contact into MongoDB.
    result = contacts_collection.insert_one(contact)

    return {
        "message": "Trusted contact added successfully",
        "contact": {
            "id": str(result.inserted_id),
            "name": name,
            "phone": phone,
            "relationship": relationship
        }
    }


# ============================================================
# GET ALL TRUSTED CONTACTS
# ============================================================

def get_contacts():
    """
    Retrieve all trusted contacts from MongoDB.
    """

    contacts = list(
        contacts_collection.find(
            {},
            {"_id": 1, "name": 1, "phone": 1, "relationship": 1}
        )
    )

    # Convert MongoDB ObjectId to string
    # because ObjectId cannot be directly returned as JSON.
    for contact in contacts:
        contact["id"] = str(contact["_id"])
        del contact["_id"]

    return contacts


# ============================================================
# REMOVE TRUSTED CONTACT
# ============================================================

def remove_contact(phone):
    """
    Remove a trusted contact using the phone number.
    """

    result = contacts_collection.delete_one(
        {"phone": phone}
    )

    if result.deleted_count == 0:
        return {
            "message": "Contact not found"
        }

    return {
        "message": "Contact removed successfully"
    }


# ============================================================
# TEST MODULE
# ============================================================

if __name__ == "__main__":

    print("Testing Trusted Contacts MongoDB module...")

    # Add a test contact
    result = add_contact(
        "Test Contact",
        "9999999999",
        "Friend"
    )

    print("\nAdded Contact:")
    print(result)

    # Get contacts
    print("\nAll Contacts:")
    print(get_contacts())

    # Remove test contact
    result = remove_contact("9999999999")

    print("\nRemove Contact:")
    print(result)

    # Check contacts again
    print("\nContacts After Removal:")
    print(get_contacts())