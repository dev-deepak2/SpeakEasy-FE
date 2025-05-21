import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis } = location.state || {};

  const cleanedAnalysis =
    typeof analysis === 'string' ? analysis.replace(/\*\*/g, '') : null;

  if (!cleanedAnalysis) {
    return (
      <div className=" flex flex-col justify-center items-center text-center px-4 ">
        <h2 className="text-2xl font-semibold text-red-500">No analysis data found!</h2>
        <button
          onClick={() => navigate('/QSetUp')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Conversation Analysis</h1>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
       <p className="bg-indigo-50 text-indigo-900 text-lg whitespace-pre-line p-4 rounded-md shadow-md border-l-4 border-indigo-500 font-medium">
        {cleanedAnalysis}
        </p>

        <button
          onClick={() => navigate('/QSetUp')}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Restart Practice
        </button>
      </div>
    </div>
  );
}
