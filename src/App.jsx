import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateQuiz from './components/CreateQuiz';
import JoinQuiz from './components/JoinQuiz';
import QuizPage from './components/QuizPage';
import Loader from './components/Loader';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/Joinquiz" element={<JoinQuiz />} />
          <Route path="/Quizpage" element={<QuizPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
