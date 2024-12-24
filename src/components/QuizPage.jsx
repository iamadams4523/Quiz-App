import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safely access the nested quizData array
  const quizData = Array.isArray(state?.quizData?.quizData)
    ? state.quizData.quizData
    : [];

  // Helper function to clean options
  const cleanOption = (option) => {
    return option.replace(/^[]\s*[A-D]\)\s*/, '').trim();
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    // Set the start time when the quiz begins
    setStartTime(Date.now());
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);

    if (option === quizData[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question after a delay
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        // Set the end time when the quiz completes
        setEndTime(Date.now());
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  // Calculate total time taken
  const timeTaken = endTime ? ((endTime - startTime) / 1000).toFixed(2) : null;

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        {!quizCompleted ? (
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              Welcome {state?.fullName}
            </h1>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Question {currentQuestion + 1}/{quizData.length}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {quizData[currentQuestion].question}
            </p>
            <div className="grid gap-4">
              {quizData[currentQuestion].options.map((option, index) => {
                const cleanedOption = cleanOption(option); // Clean the option here
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(cleanedOption)}
                    className={`w-full p-3 rounded-md font-medium text-center ${
                      showAnswer
                        ? cleanedOption === quizData[currentQuestion].answer
                          ? 'bg-green-500 text-white'
                          : cleanedOption === selectedOption
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                        : 'bg-gray-200 text-gray-800'
                    } transition duration-200 ease-in-out`}
                    disabled={showAnswer}
                  >
                    {cleanedOption}
                  </button>
                );
              })}
            </div>
            {showAnswer && (
              <p className="mt-4 text-lg font-medium text-green-600">
                Correct Answer: {quizData[currentQuestion].answer}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quiz Completed! 🎉
            </h2>
            <p className="text-lg mb-2">
              Your Score: {score} / {quizData.length}
            </p>
            <p className="text-lg mb-4">Time Taken: {timeTaken} seconds</p>
            <div className="flex justify-between gap-1 ">
              <button
                onClick={restartQuiz}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Restart Quiz
              </button>
              <button
                onClick={() => {
                  navigate('/');
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              >
                End quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
