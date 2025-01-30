import React from 'react'

const AuthImagePattern = ({ title, subtitle }) => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 mt-10">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {array.map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-full bg-blue-800/10 ${
                  i % 3 === 0
                    ? "animate-grow-shrink"
                    : i % 3 === 1
                    ? "animate-pulse-round"
                    : "animate-round-flip"
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };

  
  

  
export default AuthImagePattern