import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [questionFile, setQuestionFile] = useState(null);
  const [answerFile, setAnswerFile] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [quizUploaded, setQuizUploaded] = useState(false);
  const navigate = useNavigate();

  const handleUploadQuiz = async (e) => {
    e.preventDefault();

    // Check if both files are provided
    if (!questionFile || !answerFile) {
      alert('Please upload both question and answer files.');
      return;
    }

    setLoading(true);

    // Create a FormData object to send files
    const formData = new FormData();
    formData.append('questionFile', questionFile);
    formData.append('answerFile', answerFile);

    try {
      // Make the POST request with Axios
      const response = await axios.post(
        'https://quizbackend-e9xg.onrender.com/api/upload-quiz',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Handle the response from the backend
      console.log(response.data);
      alert('Quiz uploaded successfully!');
      setSessionId(response.data.sessionID);
      setQuizUploaded(true); // Indicate that the quiz was uploaded successfully
    } catch (error) {
      console.error('Error uploading quiz:', error);
      alert('Failed to upload quiz.');
    } finally {
      setLoading(false);
    }
  };

  const SessionIdPage = ({ sessionId }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-[400px] text-center">
        <h1 className="text-2xl font-bold text-purple-600">Session ID</h1>
        <p className="mt-2 text-gray-500">
          Share this session ID with participants to join the quiz:
        </p>
        <div className="mt-4 p-4 bg-purple-100 text-purple-700 font-semibold rounded-md text-xl">
          {sessionId || 'No Session ID Available'}
        </div>
        <div className="flex flex-col">
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigator.clipboard.writeText(sessionId)}
          >
            Copy Session ID
          </button>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate('/Joinquiz')}
          >
            Join Quiz
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {quizUploaded ? (
        <SessionIdPage sessionId={sessionId} />
      ) : (
        <div className="bg-softPink w-[25rem] h-[25rem] mx-auto mt-[3rem]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-manrope font-bold text-[20px] mt-2 text-purple-500">
              Create a Quiz
            </h1>
            <p className="font-manrope font-semibold text-[14px] text-blue-400">
              Engage your audience and test their knowledge
            </p>
          </div>
          {loading ? (
            <Loader /> // Display loader while uploading
          ) : (
            <form
              className="flex flex-col justify-center items-center gap-4 mt-4"
              onSubmit={handleUploadQuiz}
            >
              <div className="flex flex-col">
                <label className="text-lg font-medium text-purple-500 mb-2">
                  Question File:
                </label>
                <input
                  type="file"
                  className="file:border-2 file:border-gray-300 file:rounded-md file:p-2 file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100"
                  onChange={(e) => setQuestionFile(e.target.files[0])}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium text-purple-500 mb-2">
                  Answer File:
                </label>
                <input
                  type="file"
                  className="file:border-2 file:border-gray-300 file:rounded-md file:p-2 file:bg-green-50 file:text-green-700 file:hover:bg-green-100"
                  onChange={(e) => setAnswerFile(e.target.files[0])}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-3 px-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition-colors"
                >
                  Upload
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
