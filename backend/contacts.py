from backend.database import contacts_collection


# Add a trusted contact for a specific user
def add_contact(user_id, name, phone, relationship):
    contact = {
        "user_id": user_id,
        "name": name.strip(),
        "phone": phone.strip(),
        "relationship": relationship.strip()
    }

    result = contacts_collection.insert_one(contact)

    return {
        "message": "Trusted contact added successfully",
        "contact": {
            "id": str(result.inserted_id),
            "user_id": user_id,
            "name": name.strip(),
            "phone": phone.strip(),
            "relationship": relationship.strip()
        }
    }


# Get only the logged-in user's contacts
def get_contacts(user_id):
    contacts = list(
        contacts_collection.find(
            {"user_id": user_id},
            {
                "_id": 1,
                "user_id": 1,
                "name": 1,
                "phone": 1,
                "relationship": 1
            }
        )
    )

    for contact in contacts:
        contact["id"] = str(contact["_id"])
        del contact["_id"]

    return contacts


# Remove only the logged-in user's contact
def remove_contact(user_id, phone):
    result = contacts_collection.delete_one(
        {
            "user_id": user_id,
            "phone": phone.strip()
        }
    )

    if result.deleted_count == 0:
        return {
            "message": "Contact not found"
        }

    return {
        "message": "Contact removed successfully"
    }