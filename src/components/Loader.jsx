import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
