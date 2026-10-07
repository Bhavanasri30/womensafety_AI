import api from "./api";

// Analyze a user's situation
export async function analyzeSituation(situation) {
  const response = await api.post("/analyze", {
    situation,
  });

  return response.data;
}

// Send a message to the RAG safety chatbot
export async function sendChatMessage(message, language = "english") {
  const response = await api.post("/chat", {
    message,
    language,
  });

  return response.data;
}

// Get trusted contacts
export async function getContacts() {
  const response = await api.get("/contacts");
  return response.data;
}

// Add trusted contact
export async function addContact(name, phone, relationship) {
  const response = await api.post("/contacts", {
    name,
    phone,
    relationship,
  });

  return response.data;
}

// Remove trusted contact
export async function removeContact(phone) {
  const response = await api.delete(
    `/contacts/${encodeURIComponent(phone)}`
  );

  return response.data;
}

// Save safety word
export async function saveSafetyWord(word) {
  const response = await api.post("/safety-word", {
    word,
  });

  return response.data;
}

// Check safety word
export async function checkSafetyWord(message) {
  const response = await api.post("/safety-word/check", {
    message,
  });

  return response.data;
}

// Check whether safety word is configured
export async function getSafetyWordStatus() {
  const response = await api.get("/safety-word");
  return response.data;
}

// Save current location
export async function saveLocation(latitude, longitude) {
  const response = await api.post("/location", {
    latitude,
    longitude,
  });

  return response.data;
}

// Get saved location
export async function getLocation() {
  const response = await api.get("/location");
  return response.data;
}

// Remove saved location
export async function removeLocation() {
  const response = await api.delete("/location");
  return response.data;
}

// Prepare SOS
export async function prepareSOS(situation) {
  const response = await api.post("/sos/prepare", {
    situation,
  });

  return response.data;
}

// Confirm SOS
export async function confirmSOS(situation, riskType, severity) {
  const response = await api.post("/sos/confirm", {
    situation,
    risk_type: riskType,
    severity,
  });

  return response.data;
}

// Get incident history
export async function getIncidents() {
  const response = await api.get("/incidents");
  return response.data;
}

// Delete incident history
export async function clearIncidents() {
  const response = await api.delete("/incidents");
  return response.data;
}