import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryPage() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10 flex flex-col items-center space-y-10">
      <div className="max-w-4xl w-full mx-auto text-center">


      <h1 className=" cursor-pointer text-5xl mb-8 font-bold bg-gradient-to-tl from-teal-400 via-blue-400 to-purple-600 text-transparent bg-clip-text drop-shadow-xl leading-tight hover:text-gray-800 transition duration-300 ease-in-out">
        SpeakEasy
        </h1>

        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
         Enhance your speaking skills with AI-powered real-time conversations and analysis.
        </p>
      </div>



      <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 ">
        <div
          onClick={() => navigate('/Home')}
          className="w-80 h-60 hover:scale-105 hover:shadow-2xl  cursor-pointer rounded-lg shadow-xl p-6 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex flex-col  items-center text-center transition-transform duration-300" 
        >
          <h2 className="text-xl font-semibold text-center">Practice English</h2>
          <p className="text-sm mt-2">AI-powered English practice: Speak, analyze, and learn.</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mic w-10 h-10 ml-2 mr-2 mt-8">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
           <p className="text-xs mt-auto opacity-80  hover:opacity-100 hover:-scale-z-100 transition-opacity duration-300 ease-in-out">
            Get Started &gt;</p>
        </div>

        <div
          onClick={() => navigate('/Characters')}
          className="w-80 h-60 hover:scale-105 hover:shadow-2xl cursor-pointer rounded-lg shadow-xl p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white flex flex-col  items-center text-center transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-center">Talk to Characters</h2>
          <p className="text-sm mt-2">Engage in live conversations with different AI characters.</p>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user w-12 h-12 ml-2 mr-2 mt-6">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
           <p className="text-xs mt-auto opacity-80  hover:opacity-100 hover:-scale-z-100 transition-opacity duration-300 ease-in-out">
            Get Started &gt;</p>
        </div>
      </div>
    </div>
  );
}
