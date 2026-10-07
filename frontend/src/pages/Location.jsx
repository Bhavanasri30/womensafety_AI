import { useEffect, useState } from "react";
import {
  MapPin,
  Navigation,
  CheckCircle2,
  Trash2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import {
  saveLocation,
  getLocation,
  removeLocation,
} from "../services/safety";
import LoadingButton from "../components/LoadingButton";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Location() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  useEffect(() => {
    loadLocation();
  }, []);

  async function loadLocation() {
    setLoading(true);
    setError("");

    try {
      const response = await getLocation();
      setLocation(response || null);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load saved location."
      );
    } finally {
      setLoading(false);
    }
  }

  function getBrowserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(
          new Error(
            "Location services are not supported by this browser."
          )
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (locationError) => {
          let message = "Unable to get your location.";

          if (locationError.code === 1) {
            message =
              "Location permission was denied. Please allow location access in your browser.";
          } else if (locationError.code === 2) {
            message = "Your location is currently unavailable.";
          } else if (locationError.code === 3) {
            message =
              "Location request timed out. Please try again.";
          }

          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }

  async function handleUpdateLocation() {
    setGettingLocation(true);
    setError("");
    setSuccess("");

    try {
      const coordinates = await getBrowserLocation();

      const response = await saveLocation(
        coordinates.latitude,
        coordinates.longitude
      );

      setLocation(
        response?.location || {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }
      );

      setSuccess("Your latest location was saved successfully.");
    } catch (err) {
      setError(
        err?.message ||
          err?.response?.data?.detail ||
          "Unable to update your location."
      );
    } finally {
      setGettingLocation(false);
    }
  }

  async function handleRemoveLocation() {
    setRemoving(true);
    setError("");
    setSuccess("");

    try {
      await removeLocation();

      setLocation(null);
      setShowRemoveConfirm(false);
      setSuccess("Saved location removed successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to remove the saved location."
      );
    } finally {
      setRemoving(false);
    }
  }

  function formatCoordinate(value) {
    if (typeof value !== "number") {
      return "Not available";
    }

    return value.toFixed(6);
  }

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "15px",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <MapPin size={25} color="#2563eb" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Safety Location
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Save your latest location so it can be included in the safety
          workflow when you request assistance.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "13px 15px",
            marginBottom: "18px",
            borderRadius: "13px",
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            color: "#be123c",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            padding: "13px 15px",
            marginBottom: "18px",
            borderRadius: "13px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            fontSize: "13px",
          }}
        >
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Main location card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "22px",
          padding: "26px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            marginBottom: "22px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                color: "#0f172a",
              }}
            >
              Current Saved Location
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              Your location is only saved when you choose to update it.
            </p>
          </div>

          <div
            style={{
              width: "43px",
              height: "43px",
              borderRadius: "13px",
              background: location ? "#eff6ff" : "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Navigation
              size={20}
              color={location ? "#2563eb" : "#94a3b8"}
            />
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: "35px 10px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Loading saved location...
          </div>
        ) : location ? (
          <div
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                marginBottom: "15px",
              }}
            >
              <CheckCircle2 size={18} color="#16a34a" />

              <strong
                style={{
                  fontSize: "14px",
                  color: "#166534",
                }}
              >
                Location available
              </strong>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
              }}
            >
              <div
                style={{
                  padding: "13px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginBottom: "5px",
                    fontWeight: "700",
                  }}
                >
                  LATITUDE
                </span>

                <strong
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  {formatCoordinate(location.latitude)}
                </strong>
              </div>

              <div
                style={{
                  padding: "13px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginBottom: "5px",
                    fontWeight: "700",
                  }}
                >
                  LONGITUDE
                </span>

                <strong
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  {formatCoordinate(location.longitude)}
                </strong>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "30px 20px",
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
              textAlign: "center",
              marginBottom: "18px",
            }}
          >
            <MapPin
              size={30}
              color="#94a3b8"
              style={{ marginBottom: "9px" }}
            />

            <strong
              style={{
                display: "block",
                fontSize: "14px",
                color: "#475569",
                marginBottom: "5px",
              }}
            >
              No saved location
            </strong>

            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              Update your location when you want it available for safety
              assistance.
            </span>
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <LoadingButton
            type="button"
            loading={gettingLocation}
            disabled={gettingLocation || removing}
            onClick={handleUpdateLocation}
            style={{
              flex: 1,
              minWidth: "190px",
              height: "46px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: "700",
              cursor: gettingLocation
                ? "not-allowed"
                : "pointer",
            }}
          >
            {!gettingLocation && (
              <>
                <Navigation size={17} />
                Update My Location
              </>
            )}
          </LoadingButton>

          {location && (
            <button
              type="button"
              onClick={() => setShowRemoveConfirm(true)}
              disabled={gettingLocation || removing}
              style={{
                height: "46px",
                padding: "0 16px",
                borderRadius: "12px",
                border: "1px solid #fecdd3",
                background: "#fff1f2",
                color: "#dc2626",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <Trash2 size={17} />
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Privacy note */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "11px",
          padding: "17px",
          borderRadius: "15px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <ShieldCheck
          size={20}
          color="#64748b"
          style={{ flexShrink: 0 }}
        />

        <div>
          <strong
            style={{
              display: "block",
              marginBottom: "4px",
              fontSize: "13px",
              color: "#334155",
            }}
          >
            Location privacy
          </strong>

          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            Nari-Shield uses your browser's location permission. Your location
            is not automatically updated continuously by this page.
          </p>
        </div>
      </div>

      {/* Confirmation */}
      <ConfirmDialog
        open={showRemoveConfirm}
        title="Remove Saved Location"
        message="Are you sure you want to remove your saved safety location?"
        confirmText="Remove Location"
        cancelText="Cancel"
        loading={removing}
        onConfirm={handleRemoveLocation}
        onCancel={() => setShowRemoveConfirm(false)}
      />
    </div>
  );
}