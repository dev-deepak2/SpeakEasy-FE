import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VoiceInput from './VoiceInput';
import './assets/Home.css';

export default function Home({ maxQuestions }) {
  const [question, setQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAnalysisPrompt, setShowAnalysisPrompt] = useState(false);
  const [showAnswer, setShowAnswer] = useState(true);


  const navigate = useNavigate();

  // Redirect if maxQuestions not provided
useEffect(() => {
  if (!maxQuestions) {
    console.warn('No questions selected, redirecting...');
    navigate('/QSetUp');
  }
}, [maxQuestions, navigate]);


  // ------------------- Text to Speech -------------------
  const textToSpeech = async (text, voiceId) => {
    try {
      const response = await axios.post(
        'https://speakeasy-be.onrender.com/api/text-to-speech',
        { text, voiceId : 'JBFqnCBsd6RMkjVDRZzb' },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error in textToSpeech:', error);
    }
  };

  /***********Play Audio+++++++++++++++++++++++++++++++++++++ */
  const playAudio = (audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    new Audio(audioUrl).play();
  };

  // ------------------- Question Flow -------------------55

  const handleStart = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.post('https://speakeasy-be.onrender.com/api/start');
      const generatedQuestion = res.data.question;
      setQuestion(generatedQuestion);

      const audioBlob = await textToSpeech(generatedQuestion);
      playAudio(audioBlob);
    } catch (err) {
      console.error('Failed to load question', err);
      alert('The Voice feature is down. However you can try the only-text feature.');
    } finally {
      setLoading(false);
    }
  };
/**On user submit========================================== */
  const handleUserSubmit = async (input = userInput) => {
    const finalInput = input?.trim();
 console.log("Submitting input:", finalInput); // ✅

    if (!finalInput) {
      return handleSilentUser();
    }

    const newConversation = [...conversation, { question, answer: finalInput }];
    setConversation(newConversation);

    const newCount = questionCount + 1;
    setQuestionCount(newCount);
    console.log(newCount);

    //fade===============================
    setShowAnswer(true);
    setTimeout(() => setShowAnswer(false), 2000);


    if (newCount >= maxQuestions) {
      setShowAnalysisPrompt(true);
      setQuestion('');
    } else {
      await loadFollowupQuestion(finalInput);
    }

    setUserInput('');
  };

  const handleSilentUser = async () => {
    const fallbackPrompt =
      "The user went silent or didn't say anything. Please respond in a friendly and casual way like 'Hey, are you gonna say something or not?'";

    const res = await axios.post('https://speakeasy-be.onrender.com/api/followup', {
      userInput: fallbackPrompt,
    });

    const fallbackQuestion = res.data.followupQuestion;
    setQuestion(fallbackQuestion);

    const audioBlob = await textToSpeech(fallbackQuestion);
    playAudio(audioBlob);
  };
/********************Loading the followup question......... */
  const loadFollowupQuestion = async (userInput) => {
    try {
      const res = await axios.post('https://speakeasy-be.onrender.com/api/followup', { userInput });
      const nextQuestion = res.data.followupQuestion;
      setQuestion(nextQuestion);

      const audioBlob = await textToSpeech(nextQuestion);
      playAudio(audioBlob);
    } catch (err) {
      console.error('Failed to load follow-up question', err.response?.data || err.message);
    }
  };

  //Analysis-------------------------------------------//

  const analyzeConversation = async () => {
  try {
    const res = await axios.post('https://speakeasy-be.onrender.com/api/analyze', { conversation });
    console.log('Analysis result:', res.data);
    navigate('/analysis', { state: { analysis: res.data.analysis } });
  } catch (err) {
    console.error('Error analyzing conversation:', err);
  }
};


  const restart = () => {
  navigate('/QSetUp');
  };


  
  // ------------------- UI -------------------
 return (
  <div className=" px-4 py-8 flex flex-col items-center text-center font-sans ">
    <header className="mb-18">
      <h1 className="text-4xl mb-4 font-bold bg-gradient-to-l from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-xl leading-tight hover:text-gray-800 transition duration-300 ease-in-out">
    SpeakEasy
     </h1>

      {maxQuestions && (
        <p className="text-lg text-gray-600">
          You'll be answering <span className="font-semibold text-indigo-600">{maxQuestions}</span> questions in this session
        </p>
        
      )}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(maxQuestions)].map((_, idx) => (
          <span
            key={idx}
            className={`w-8 h-2 rounded-full transition-all duration-300 ${
          idx < questionCount ? 'bg-indigo-600' : 'bg-gray-300' }`}
          />
        ))}
      </div>
    </header>



   {maxQuestions && (
  <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl w-full">
    {!question && !analysis && !showAnalysisPrompt ? (
      <>
        {/* Start Practice UI */}
        <p className="text-gray-950-600 mb-6">
          Answer naturally using your voice or text..
        </p>
        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition"
        >
          {loading ? "Loading..." : (
            <>
              <span className="mr-2 cursor-pointer">▶</span> Start Practice
            </>
          )}
        </button>
      </>
    ) : (
      <>
        {/* Question and Answer Chat Bubble */}
        {question && (
          <div className="w-full max-w-2xl mt-6 space-y-4 text-left">
            <div className="flex justify-start">
              <div className="bg-indigo-100 text-indigo-900 px-4 py-3 rounded-lg shadow-md max-w-[80%]">
                <strong>Coach:</strong> {question}
              </div>
            </div>

            {conversation.length > 0 && (
              <div className="flex justify-end">
                <div
                  className={`bg-green-100 text-green-900 px-4 py-3 rounded-lg shadow-md max-w-[80%] transition-opacity duration-1000 ${
                    showAnswer ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <strong>You:</strong> {conversation[conversation.length - 1].answer}
                </div>
              </div>
            )}

          </div>
        )}

        {/* VoiceInput + Text Input */}
        <div className="w-full max-w-2xl my-6 p-4 bg-white shadow-md rounded-xl cursor-pointer">
          <VoiceInput
            onFinalTranscript={(text) => {
              console.log("Voice input received:", text);
              setUserInput(text);
              handleUserSubmit(text);
            }}
          />
        </div>

        <div className="w-full max-w-2xl flex items-center gap-2 mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUserSubmit(userInput);
                setUserInput('');
               
              }
            }}

            placeholder="Or you can type your answer here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <button
           onClick={() => {
            handleUserSubmit(userInput);
             setUserInput(''); // 👈 Clear input
               }}
            
            className=" cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </>
    )}
  </div>
)}



    {showAnalysisPrompt && (
  <section className="bg-gradient-to-br from-indigo-800 via-indigo-600 to-indigo-300  text-white p-4 rounded-2xl shadow-lg mt-8 max-w-xl w-full text-center">
    <h3 className="text-xl font-semibold text-white mb-4">
      Would you like to see your conversation analysis?
    </h3>
    <div className="flex justify-center gap-4">
      <button
        onClick={analyzeConversation}
        className="text-indigo-700 bg-white hover:bg-indigo-100  duration-200 shadow-md hover:scale-105 px-5 py-2 rounded-lg transition font-medium cursor-pointer"
      >
        Yes, Show Me
      </button>
      <button
        onClick={restart}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition font-medium cursor-pointer"
      >
        No, Start Again
      </button>
    </div>
  </section>
)}


  </div>
);

             
}
