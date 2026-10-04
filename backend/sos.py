# ============================================================
# NARI-SHIELD AI - SOS DECISION MODULE
# ============================================================

# This file contains the logic that decides whether
# the user should be shown a prominent SOS option.
#
# IMPORTANT:
# This module does NOT automatically call emergency services.
# It only makes a safety recommendation based on the
# ML-generated severity and risk type.


# ============================================================
# 1. HIGH-RISK SEVERITY LEVELS
# ============================================================

# These severity levels indicate that the situation may
# require immediate attention.

HIGH_RISK_LEVELS = [
    "high",
    "critical"
]


# ============================================================
# 2. FUNCTION TO DECIDE SOS STATUS
# ============================================================

def get_sos_decision(risk_type, severity):
    """
    Decide whether the SOS option should be prominently shown.

    Parameters:
        risk_type:
            The risk category predicted by the ML model.

        severity:
            The severity predicted by the ML model.

    Returns:
        A dictionary containing the SOS decision and reason.
    """

    # Convert severity to lowercase so that
    # "High", "HIGH", and "high" are treated the same.
    severity = severity.lower()

    # --------------------------------------------------------
    # HIGH / CRITICAL SITUATION
    # --------------------------------------------------------

    if severity in HIGH_RISK_LEVELS:

        return {
            "sos_recommended": True,
            "priority": "high",
            "reason": (
                "The situation was classified as high or "
                "critical severity. Show the SOS option "
                "prominently so the user can request help."
            )
        }

    # --------------------------------------------------------
    # LOW / MEDIUM SITUATION
    # --------------------------------------------------------

    return {
        "sos_recommended": False,
        "priority": "normal",
        "reason": (
            "The situation was not classified as high or "
            "critical severity. Provide safety guidance and "
            "keep the SOS option available."
        )
    }


# ============================================================
# 3. TEST THE MODULE
# ============================================================

# This block runs only when we execute sos.py directly.
# It will NOT run when another file imports this module.

if __name__ == "__main__":

    # Test a high-severity situation
    result = get_sos_decision(
        "public safety / stalking",
        "high"
    )

    # Display the result
    print("SOS Decision:")
    print(result)