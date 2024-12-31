import React from 'react';
import Picture from '../assets/cathryn-lavery-fMD_Cru6OTk-unsplash.jpg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-image h-screen bg-cover">
        <header className="w-[90%] h-[10%] mx-auto pt-4 flex justify-between items-center">
          <div className="text-white text-[35px] font-bold font-['Inter'] leading-10">
            Quizopolis
          </div>
          <div className="w-[45%] flex justify-between items-center button-div">
            <button
              onClick={() => navigate('/createquiz')}
              className="p-2 rounded-[100px] border border-white text-white text-[14px] font-['Inter'] leading-normal hover:bg-blue-400 button"
            >
              Create a test
            </button>
            <button
              onClick={() => navigate('/Joinquiz')}
              className="p-2 rounded-[100px] border border-white text-white text-[14px] font-['Inter'] leading-normal hover:bg-blue-400 button"
            >
              Join a test
            </button>
          </div>
        </header>
        <div className="w-[90%] h-[308px] mx-auto mt-[6rem] flex justify-between items-center word-image">
          <div className="w-[45%] flex-col justify-start items-start flex word">
            <h1 className="text-white text-6xl font-semibold font-['Inter'] leading-[78px] tracking-wide small">
              Unleash Your Inner Wizard of Wisdom
            </h1>
            <p className="text-white text-xl font-normal font-['Inter'] leading-relaxed tracking-tight fs">
              Embark on a Journey of Knowledge. Exploration with Our Extensive
              Collection of Interactive Quizzes.
            </p>
          </div>

          <div className="w-[45%] justify-center items-center flex image">
            <img
              src={Picture}
              className="w-full rounded-[20px]"
              alt="Quiz description"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
