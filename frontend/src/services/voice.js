const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export function isVoiceSupported() {
  return Boolean(SpeechRecognition);
}

export function startVoiceRecognition({
  language = "en-IN",
  onResult,
  onStart,
  onEnd,
  onError,
}) {
  if (!SpeechRecognition) {
    onError?.("Voice recognition is not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    onStart?.();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    onResult?.(transcript);
  };

  recognition.onerror = (event) => {
    onError?.(event.error || "Voice recognition failed.");
  };

  recognition.onend = () => {
    onEnd?.();
  };

  recognition.start();

  return recognition;
}

export function stopVoiceRecognition(recognition) {
  if (recognition) {
    recognition.stop();
  }
}