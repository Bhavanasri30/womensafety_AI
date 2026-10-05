# ============================================================
# NARI-SHIELD AI
# Authentication Module
# ============================================================

from passlib.context import CryptContext
from backend.database import users_collection

# JWT imports
from jose import jwt
from datetime import datetime, timedelta
import os


# ============================================================
# PASSWORD HASHING CONFIGURATION
# ============================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ============================================================
# JWT CONFIGURATION
# ============================================================

# Secret key is loaded from the .env file.
# A fallback value is provided only for development.
SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "nari-shield-development-secret-key"
)

# Algorithm used to sign the JWT token
ALGORITHM = "HS256"

# Token will remain valid for 60 minutes
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ============================================================
# PASSWORD FUNCTIONS
# ============================================================

def hash_password(password: str):
    """
    Convert a plain-text password into a secure bcrypt hash.
    """
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
):
    """
    Compare the entered password with the stored password hash.
    """
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# ============================================================
# USER REGISTRATION
# ============================================================

def register_user(
    name: str,
    email: str,
    password: str
):
    """
    Register a new user in MongoDB.
    """

    # Remove unnecessary spaces
    name = name.strip()

    # Convert email to lowercase
    email = email.strip().lower()

    # Check whether the email already exists
    existing_user = users_collection.find_one(
        {"email": email}
    )

    if existing_user:
        return {
            "success": False,
            "message": "An account with this email already exists."
        }

    # Hash the password before storing it
    hashed_password = hash_password(password)

    # Create user document
    user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }

    # Insert user into MongoDB
    result = users_collection.insert_one(user)

    return {
        "success": True,
        "message": "User registered successfully.",
        "user": {
            "id": str(result.inserted_id),
            "name": name,
            "email": email
        }
    }


# ============================================================
# USER LOGIN
# ============================================================

def login_user(
    email: str,
    password: str
):
    """
    Verify user credentials and create a JWT token.
    """

    # Normalize email
    email = email.strip().lower()

    # Find user in MongoDB
    user = users_collection.find_one(
        {"email": email}
    )

    # User does not exist
    if user is None:
        return {
            "success": False,
            "message": "Invalid email or password."
        }

    # Verify entered password
    password_valid = verify_password(
        password,
        user["password"]
    )

    # Password is incorrect
    if not password_valid:
        return {
            "success": False,
            "message": "Invalid email or password."
        }

    # Create JWT token
    access_token = create_access_token(
        str(user["_id"])
    )

    return {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }


# ============================================================
# CREATE JWT ACCESS TOKEN
# ============================================================

def create_access_token(user_id: str):
    """
    Create a JWT token containing the user's ID.
    """

    # Calculate token expiration time
    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # Information stored inside the JWT
    payload = {
        "user_id": user_id,
        "exp": expire
    }

    # Encode and sign the token
    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


# ============================================================
# VERIFY JWT ACCESS TOKEN
# ============================================================

def verify_access_token(token: str):
    """
    Verify a JWT token and return the user ID.
    """

    try:

        # Decode the token
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # Extract user ID
        user_id = payload.get("user_id")

        # User ID is missing
        if user_id is None:
            return None

        return user_id

    except Exception:
        # Token is invalid or expired
        return None


# ============================================================
# TEST MODULE
# ============================================================

if __name__ == "__main__":

    print("Authentication module loaded successfully!")

    # Test JWT creation
    test_user_id = "test-user-123"

    token = create_access_token(
        test_user_id
    )

    print("JWT token created successfully!")

    # Test JWT verification
    verified_user_id = verify_access_token(
        token
    )

    print(
        "Verified user ID:",
        verified_user_id
    )