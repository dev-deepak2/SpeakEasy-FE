import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import VoiceInput from './VoiceInput';

export default function CharacterPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { voiceId, name, img } = location.state || {};

  const [question, setQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastAnswer, setLastAnswer] = useState('');


  // Redirect if no character name
  useEffect(() => {
    if (!name) {
      navigate('/character');
    }
  }, [name, navigate]);

  // Text-to-Speech
  const textToSpeech = async (text, voiceId) => {
    if (!voiceId) return;
    try {
      const response = await axios.post(
        'https://speakeasy-be.onrender.com/api/text-to-speech',
        { text, voiceId },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (err) {
      console.error("Failed to convert text to speech:", err);
      alert('The voice feature is down. Please try again.');
    }
  };

  // Play Audio
  const playAudio = (audioBlob) => {
    if (!audioBlob) {
      console.warn("No audio blob to play.");
      return;
    }
    const audioUrl = URL.createObjectURL(audioBlob);
    new Audio(audioUrl).play();
  };

  // Start the conversation
  const handleStart = async () => {
    if (loading || !name) return;
    setLoading(true);
    try {
      const res = await axios.post('https://speakeasy-be.onrender.com/api/character-start', { name });
      const generatedQuestion = res.data.question;
      setQuestion(generatedQuestion);

      const audioBlob = await textToSpeech(generatedQuestion, voiceId);
      if (audioBlob) playAudio(audioBlob);
    } catch (err) {
      console.error('Failed to load question:', err);
      alert('Too many people using. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle user input submission
  const handleUserSubmit = async (input = userInput) => {
    const finalInput = input?.trim();
    if (!finalInput) return;

    console.log("Submitting input:", finalInput);
    setUserInput('');
    setLastAnswer(finalInput);
    await loadFollowupQuestion(finalInput);
  };

  // Load next question
  const loadFollowupQuestion = async (userInput) => {
    try {
      const res = await axios.post('https://speakeasy-be.onrender.com/api/followup', { userInput });
      const nextQuestion = res.data.followupQuestion;
      setQuestion(nextQuestion);

      const audioBlob = await textToSpeech(nextQuestion, voiceId);
      if (audioBlob) playAudio(audioBlob);
    } catch (err) {
      console.error('Failed to load follow-up question:', err.response?.data || err.message);
    }
  };

  // UI
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl mb-5 font-bold bg-gradient-to-l from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-xl leading-tight hover:text-gray-800 transition duration-300 ease-in-out">
        SpeakEasy
      </h1>
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Talking to {name || id}
      </h1>

      {img && (
        <img
          src={img}
          alt={name}
          className="mx-auto w-40 h-40 object-cover rounded-full shadow-lg mb-6"
        />
      )}

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl mx-auto mt-6 w-full">
        {!question ? (
          <>
            <p className="text-gray-700 mb-6">
              Talk naturally using your voice or type your response below.
            </p>
            <button
              onClick={handleStart}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition"
            >
              {loading ? "Loading..." : (
                <>
                  <span className="mr-2 cursor-pointer">▶</span> Start Interaction
                </>
              )}
            </button>
          </>
        ) : (
          <>
            {/* Question + Last User Answer */}
            <div className="w-full max-w-2xl mt-6 space-y-4 text-left">
              <div className="flex justify-start">
                <div className="bg-indigo-100 text-indigo-900 px-4 py-3 rounded-lg shadow-md max-w-[80%]">
                  <strong>{name || "Character"}:</strong> {question}
                </div>
              </div>

              {lastAnswer && (
                <div className="flex justify-end">
                  <div className="bg-green-100 text-green-900 px-4 py-3 rounded-lg shadow-md max-w-[80%]">
                    <strong>You:</strong> {lastAnswer}
                  </div>
                </div>
              )}
            </div>

            {/* Voice Input */}
            <div className="w-full max-w-2xl my-6 p-4 bg-white shadow-md rounded-xl cursor-pointer">
              <VoiceInput
                onFinalTranscript={(text) => {
                  setUserInput(text);
                  handleUserSubmit(text);
                }}
              />
            </div>

            {/* Text Input */}
            <div className="w-full max-w-2xl flex items-center gap-2 mt-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Or you can type your answer here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
              />
              <button
                onClick={() => handleUserSubmit(userInput)}
                className= " cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
