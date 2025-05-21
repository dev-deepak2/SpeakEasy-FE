import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestionSetup({ setMaxQuestions }) {
  const [questionCount, setQuestionCount] = useState(5);
  const [isSliding, setIsSliding] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setMaxQuestions(questionCount);
    navigate("/Home");
  };

 return (
  <div className="flex flex-col  items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
    
    {/* Header moved to the top */}
  <h1 className="text-4xl pt-10 font-bold bg-gradient-to-l from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-xl leading-tight hover:text-gray-800 transition duration-300 ease-in-out">
  SpeakEasy
</h1>


    <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center mt-8">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">Question Setup</h1>

      <div className="relative mb-7 mt-5 px-4">
        <input
          type="range"
          min={1}
          max={10}
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
          onMouseDown={() => setIsSliding(true)}
          onMouseUp={() => setIsSliding(false)}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition duration-300 ease-in-out 
          ${isSliding ? 'slider-thumb-animate' : 'slider-thumb-default'}`}
        />
      </div>

      <p className="text-xl font-semibold mb-8">{questionCount} Questions</p>
      <p className="text-gray-500 mb-6">
        Select how many questions you want to practice with..
      </p>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition cursor-pointer"
      >
        Start Practice
      </button>
    </div>
  </div>
);
}