import { useState, useRef, useCallback } from 'react';

// All languages offered in the UI MUST have a speech-recognition locale here.
// Before this fix, 'te' and 'mr' were missing and silently fell back to Hindi.
const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
};

// Human-friendly messages for the error codes the Web Speech API gives us.
// Previously these errors were stored in state but never shown anywhere,
// so when the mic failed the user saw nothing — it just looked "dead".
const ERROR_MESSAGES = {
  'not-allowed':
    'Microphone permission is blocked. Tap the lock/site icon in the address bar, allow the microphone, then try again.',
  'service-not-allowed':
    'Voice service is blocked by the browser. Please use Google Chrome or Microsoft Edge.',
  'audio-capture':
    'No microphone was found. Please connect or enable a microphone and try again.',
  network:
    'Voice recognition needs an internet connection. Please check your network and try again.',
  'no-speech':
    'No speech was heard. Please speak clearly, close to the microphone, right after tapping the mic.',
  'bad-grammar': 'Voice setup error. Please reload the page and try again.',
  'language-not-supported':
    'This language is not supported for voice on your device. Try Hindi or English.',
};

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const isSupported =
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* already stopped */
    }
  }, []);

  const startListening = useCallback((selectedLang = 'hi', onResultCallback) => {
    setError(null);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        'This browser does not support voice input. Please use Google Chrome or Microsoft Edge.'
      );
      return;
    }

    // If a previous session is still active, cancel it before starting a new one.
    try {
      recognitionRef.current?.abort();
    } catch {
      /* no active session */
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = LANG_MAP[selectedLang] || 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (transcript && onResultCallback) {
        onResultCallback(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setIsListening(false);
      // 'aborted' just means the session was cancelled — not a real error.
      if (event.error !== 'aborted') {
        setError(
          ERROR_MESSAGES[event.error] ||
            `Voice input failed (${event.error}). Please try again.`
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setError('Could not start the microphone. Please try again.');
    }
  }, []);

  return { isListening, error, isSupported, startListening, stopListening };
};
