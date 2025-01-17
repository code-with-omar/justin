import React from "react";

const Loader = () => {
  return (
    <div className="fixed bottom-[13%] md:bottom-[0%] left-0 w-full h-3 bg-[#1a6565]">
      <div
        className="h-full bg-[#1cbcba] animate-[load_3s_infinite]"
        style={{ animationTimingFunction: "linear" }}
      ></div>
      <style>
        {`
          @keyframes load {
            0% { width: 0%; }
            50% { width: 50%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
