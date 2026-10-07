import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Phone,
  Trash2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import {
  getContacts,
  addContact,
  removeContact,
} from "../services/safety";
import LoadingButton from "../components/LoadingButton";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    setLoading(true);
    setError("");

    try {
      const response = await getContacts();
      setContacts(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load trusted contacts."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleAdd(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.relationship.trim()
    ) {
      setError("Please fill in all contact details.");
      return;
    }

    setAdding(true);
    setError("");
    setSuccess("");

    try {
      await addContact(
        form.name.trim(),
        form.phone.trim(),
        form.relationship.trim()
      );

      setForm({
        name: "",
        phone: "",
        relationship: "",
      });

      setSuccess("Trusted contact added successfully.");
      await loadContacts();
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to add trusted contact."
      );
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete() {
    if (!contactToDelete) return;

    setDeleting(true);
    setError("");

    try {
      await removeContact(contactToDelete.phone);

      setSuccess("Trusted contact removed successfully.");
      setContactToDelete(null);

      await loadContacts();
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Unable to remove trusted contact."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "900px",
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
            background: "#fff1f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <Users size={25} color="#e11d48" />
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Trusted Contacts
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Add people you trust so their information can be included in your
          safety and SOS workflow.
        </p>
      </div>

      {/* Alert */}
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
          <ShieldCheck size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Add contact */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <UserPlus size={20} color="#e11d48" />

          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Add Trusted Contact
          </h2>
        </div>

        <form onSubmit={handleAdd}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "14px",
            }}
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Contact name"
              disabled={adding}
              style={inputStyle}
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              disabled={adding}
              style={inputStyle}
            />

            <input
              type="text"
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              placeholder="Relationship"
              disabled={adding}
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
            }}
          >
            <LoadingButton
              type="submit"
              loading={adding}
              disabled={adding}
              style={{
                minWidth: "145px",
                height: "46px",
                border: "none",
                borderRadius: "12px",
                background: "#e11d48",
                color: "#ffffff",
                fontWeight: "700",
                cursor: adding ? "not-allowed" : "pointer",
              }}
            >
              {!adding && (
                <>
                  <UserPlus size={17} />
                  Add Contact
                </>
              )}
            </LoadingButton>
          </div>
        </form>
      </div>

      {/* Contacts list */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                color: "#0f172a",
              }}
            >
              Your Trusted Contacts
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              {contacts.length} contact
              {contacts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <ShieldCheck size={21} color="#16a34a" />
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
            Loading trusted contacts...
          </div>
        ) : contacts.length === 0 ? (
          <div
            style={{
              padding: "35px 15px",
              textAlign: "center",
              borderRadius: "15px",
              background: "#f8fafc",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            No trusted contacts added yet.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {contacts.map((contact) => (
              <div
                key={contact.id || contact.phone}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  padding: "16px",
                  borderRadius: "15px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      flexShrink: 0,
                      borderRadius: "13px",
                      background: "#fff1f2",
                      color: "#e11d48",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                      fontSize: "16px",
                    }}
                  >
                    {contact.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "14px",
                        color: "#0f172a",
                        marginBottom: "4px",
                      }}
                    >
                      {contact.name}
                    </strong>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#64748b",
                        fontSize: "12px",
                      }}
                    >
                      <Phone size={13} />
                      {contact.phone}
                    </div>

                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "11px",
                        color: "#e11d48",
                        fontWeight: "700",
                      }}
                    >
                      {contact.relationship}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setContactToDelete(contact)}
                  disabled={deleting}
                  title="Remove contact"
                  style={{
                    width: "38px",
                    height: "38px",
                    flexShrink: 0,
                    borderRadius: "10px",
                    border: "1px solid #fecdd3",
                    background: "#fff1f2",
                    color: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={Boolean(contactToDelete)}
        title="Remove Trusted Contact"
        message={
          contactToDelete
            ? `Remove ${contactToDelete.name} from your trusted contacts?`
            : ""
        }
        confirmText="Remove"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setContactToDelete(null)}
      />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "46px",
  padding: "0 14px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  fontSize: "14px",
  outline: "none",
};