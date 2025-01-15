<div className="py-6 flex justify-center flex-col px-5">
  <div className="flex items-center space-x-6 w-full justify-center">
    {advancedWrapStep.map((label, index) => (
      <div key={label} className="flex items-center justify-between space-x-2">
        {/* Step Circle */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
            index < advanceStep
              ? "bg-blue-600" // Completed step
              : index === advanceStep
              ? "bg-blue-900" // Active step
              : "bg-gray-200 text-gray-400" // Future step
          }`}
        >
          {index < advanceStep ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            index + 1
          )}
        </div>
        {/* Connector Line */}
        {index !== advancedWrapStep.length - 1 && (
          <div
            className={`h-0.5 flex-grow ${
              index < advanceStep
                ? "bg-blue-900" // Line for completed steps
                : "bg-gray-200" // Line for future steps
            }`}
          ></div>
        )}
      </div>
    ))}
  </div>
  <div className="flex justify-between mt-4 text-sm font-medium">
    {advancedWrapStep.map((label, index) => (
      <span
        key={label}
        className={`${
          index === advanceStep
            ? "text-blue-900 font-bold" // Active step text
            : index < advanceStep
            ? "text-black" // Completed step text
            : "text-gray-400" // Future step text
        }`}
      >
        {label}
      </span>
    ))}
  </div>
</div>;

//
import React, { useState, useEffect } from "react";
import { useModal } from "../contexts/Modal"; // Adjust the path to your ModalContext
import { CloseIcon, ArrowBack } from "../components/common/svgs";
import Search from "./constants/search";

export const ResponsiveSearch = () => {
  const {
    isOpen,
    step,
    openModal,
    closeModal,
    setStep,
    resultCard,
    setResultCard,
    searchStep,
    setSearchStep,
    setIsSearching,
    isSearching,
    setIsTipsOpen,
    tipsCloseModal,
    isTipsOpen,
  } = useModal();

  const [isAdvSearch, setIsAdvSearch] = useState(false);
  const [remove, setRemove] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isTipsDrawerOpen, setIsTipsDrawerOpen] = useState(false); // Secondary drawer state

  useEffect(() => {
    window.openSearch = (baseUrl = "") => {
      openModal();
      console.log("Search opened with base URL: ", baseUrl);
    };

    return () => {
      delete window.openSearch;
    };
  }, [openModal]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modalStyle = {
    position: "fixed",
    zIndex: 50,
    backgroundColor: "white",
    color: "black",
    transition: "transform 0.3s",
    top: isMobile ? "13%" : "0",
    right: "0",
    bottom: "auto",
    width: isMobile ? "100%" : "60%",
    height: "100%",
    transform: isOpen
      ? isMobile
        ? "translateY(0)"
        : "translateX(0)"
      : isMobile
      ? "translateY(100%)"
      : "translateX(100%)",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius:
      isOpen && isMobile ? "1rem" : isOpen && !isMobile ? "3rem" : "0",
    borderTopRightRadius: isOpen && isMobile ? "1rem" : "0",
  };

  const tipsDrawerStyle = {
    position: "fixed",
    zIndex: 60,
    backgroundColor: "white",
    color: "black",
    transition: "transform 0.3s",
    top: isMobile ? "15%" : "0",
    right: "0",
    bottom: "auto",
    width: isMobile ? "100%" : "40%",
    height: "100%",
    transform: isTipsDrawerOpen ? "translateX(0)" : "translateX(100%)",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
  };

  const handleAllStep = () => {
    if (step === "3") {
      setIsSearching(true);
    }
    if (step > 1) {
      setStep(step - 1);
    }
    if (resultCard == 2) {
      setResultCard(resultCard - 1);
    }
    if (searchStep == 2) {
      setSearchStep(searchStep - 1);
    }
  };

  const searchColor = (
    <h4 className="text-[#343434] text-center font-extrabold text-xl flex-1 uppercase">
      SEARCH FOR YOUR
      <span className="text-[#1cbcba] text-xl font-extrabold"> COLOR</span>
    </h4>
  );

  const comfrimColor = (
    <h4 className="text-[#343434] text-center font-extrabold text-xl flex-1 uppercase">
      COMFRIM YOUR
      <span className="text-[#1cbcba] text-xl font-extrabold"> COLOR</span>
    </h4>
  );

  const buttonSecondary = (
    <button
      className="btn rounded-full bg-white text-[#0d1120] font-normal capitalize border border-black w-1/2 hover:bg-[#1cbcba] hover:text-white hover:border-[#1cbcba] text-[12px] sm:text-base"
      onClick={() => setIsTipsOpen(true)} // Open the secondary drawer
    >
      Search Tips
    </button>
  );

  return (
    <div className="bg-white">
      <div style={modalStyle}>
        {isMobile && isOpen && (
          <div className="mx-auto mb-4 mt-4 h-2 w-[100px] rounded-full bg-teal-400"></div>
        )}
        {!isMobile && (
          <div className="flex justify-between items-center p-5 pr-7">
            {(step == "2" || step == "3") && (
              <button
                className="btn btn-circle btn-outline border-black hover:bg-white hover:border-black"
                onClick={handleAllStep}
              >
                <ArrowBack />
              </button>
            )}
            {step == "2" && searchColor}
            {step == "3" && comfrimColor}
            <button
              className="btn btn-circle btn-outline ml-auto border-black hover:bg-white hover:border-black"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>
        )}
        {isMobile && (step == "2" || step == "3") && (
          <div className="flex justify-between items-center p-2">
            <button
              className="rounded-full w-10 h-10 border flex justify-center items-center border-black hover:bg-white hover:border-black"
              onClick={handleAllStep}
            >
              <ArrowBack />
            </button>
            {step == "2" && searchColor}
            {step == "3" && comfrimColor}
            <button
              className="rounded-full w-10 h-10 border flex justify-center items-center border-black hover:bg-white hover:border-black"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <div className="flex-1">
          <Search
            remove={remove}
            setRemove={setRemove}
            isAdvSearch={isAdvSearch}
            setIsAdvSearch={setIsAdvSearch}
            buttonSecondary={buttonSecondary}
          />
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}

      {/* Secondary Drawer */}
      {isTipsOpen && (
        <div style={tipsDrawerStyle}>
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">Search Tips</h2>
            <button
              className="btn btn-circle btn-outline border-black hover:bg-white hover:border-black"
              onClick={tipsCloseModal} // Close the secondary drawer
            >
              <CloseIcon />
            </button>
          </div>
          <div className="p-5">
            {/* Add your secondary drawer content here */}
            <p>Here are some helpful search tips...</p>
          </div>
        </div>
      )}
    </div>
  );
};
