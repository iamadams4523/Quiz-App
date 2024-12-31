import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="loader"></div>
      <span>Loading...</span>

      {/* CSS for the loader */}
      <style jsx>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3498db;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
