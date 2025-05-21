import { useState, useRef, useEffect } from 'react';

export default function VoiceInput({ onFinalTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [livePreview, setLivePreview] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setLivePreview('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
        } else {
          interimTranscript += result[0].transcript + ' ';
        }
      }

      if (interimTranscript.trim()) setLivePreview(interimTranscript.trim());

      if (finalTranscript.trim()) {
        setLivePreview('');
        console.log("Final transcript sent to parent:", finalTranscript.trim());
        onFinalTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [onFinalTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Start error:", err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-500 to-indigo-300 shadow-lg text-white">
      <button
        onClick={toggleListening}
        className={`px-6 py-2 rounded-full font-semibold text-lg shadow transition-transform duration-200 transform ${
          isListening
            ? 'bg-red-600 hover:bg-red-700 scale-105'
            : 'bg-white text-indigo-700 hover:bg-gray-100 scale-105'
        }`}
      >
        {isListening ? '🛑 Stop Listening' : '🎤 Start Speaking'}
      </button>

      {isListening && (
        <div className="w-full max-w-md p-4 rounded-lg bg-white text-indigo-700 font-medium italic shadow-inner border border-indigo-300">
          🗣️ Live: {livePreview || 'Listening...'}
        </div>
      )}
    </div>
  );
}
