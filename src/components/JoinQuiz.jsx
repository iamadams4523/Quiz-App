// JoinQuiz.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader2'; // Import the Loader component

const JoinQuiz = () => {
  const [fullName, setFullName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loader

    try {
      const response = await axios.get(
        `https://quizbackend-e9xg.onrender.com/api/quizdata/${sessionId}`
      );

      const quizData = response.data;
      console.log(quizData);

      // Navigate to the Quiz component and pass data as state
      navigate('/Quizpage', { state: { fullName, quizData } });
    } catch (err) {
      console.error(err);
      setError('Unable to find the quiz. Please check the Session ID.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Join a Quiz
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              FullName
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="sessionId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Session ID
            </label>
            <input
              id="sessionId"
              type="text"
              placeholder="Enter your session id"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? <Loader text="Joining..." /> : 'Join'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinQuiz;
