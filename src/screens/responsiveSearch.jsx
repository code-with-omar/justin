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
  } = useModal();

  const [isAdvSearch, setIsAdvSearch] = useState(false);
  const [remove, setRemove] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    // Define the global openSearch function
    window.openSearch = (baseUrl = "") => {
      openModal();
      console.log("Search opened with base URL: ", baseUrl);
    };

    // Clean up the global function when the component unmounts
    return () => {
      delete window.openSearch;
    };
  }, [openModal]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 900);
    };

    // Call the function initially to set the state based on the current width
    handleResize();

    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modalStyle = {
    position: "fixed",
    zIndex: 50,
    backgroundColor: "white",
    color: "black",
    transition: "transform 0.3s",
    top: isMobile ? "13%" : "0", // For mobile, adds a gap from the top
    right: "0",
    bottom: "auto",
    width: isMobile ? "100%" : "60%", // Full width for mobile, 60% for desktop
    height: "100%",
    transform: isOpen
      ? isMobile
        ? "translateY(0)" // For mobile, open from bottom to top
        : "translateX(0)" // For desktop, slide from the right
      : isMobile
      ? "translateY(100%)" // For mobile, when closed, slide out from bottom
      : "translateX(100%)", // For desktop, when closed, slide out from right
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius:
      isOpen && isMobile ? "1rem" : isOpen && !isMobile ? "3rem" : "0", // Rounded corners for top on mobile
    borderTopRightRadius: isOpen && isMobile ? "1rem" : "0", // Same as above for top right
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

  return (
    <div className="bg-white">
      <div style={modalStyle}>
        {/* Visual indicator only for mobile */}
        {isMobile && isOpen && (
          <div className="mx-auto mb-4 mt-4 h-2 w-[100px] rounded-full bg-teal-400"></div>
        )}

        {/* Header: Visible only on desktop */}
        {!isMobile && (
          <div className="flex justify-between items-center p-5 pr-7">
            {(step == "2" || step == "3") && (
              <button
                className="btn btn-circle btn-outline border-black hover:bg-white hover:border-black"
                onClick={handleAllStep} // Ensure it doesn't go below 1
              >
                <ArrowBack />
              </button>
            )}
            {(step == "2" || step == "3") && (
              <h4 className="text-[#343434] text-center font-extrabold text-xl flex-1 uppercase">
                SEARCH FOR YOUR
                <span className="text-[#1cbcba] text-xl font-extrabold">
                  {" "}
                  COLOR
                </span>
              </h4>
            )}

            <button
              className="btn btn-circle btn-outline ml-auto border-black hover:bg-white hover:border-black"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {isMobile && (step == "2" || step == "3") && (
          // bg-[#F0EFF0]
          <div className="flex justify-between items-center p-2 ">
            <button
              className="rounded-full w-10 h-10 border flex justify-center items-center border-black hover:bg-white hover:border-black"
              onClick={handleAllStep} // Ensure it doesn't go below 1
            >
              <ArrowBack />
            </button>
            {(step == "2" || step == "3") && (
              <h4 className="text-[#343434]  font-extrabold text-base sm:text-xl  uppercase text-center">
                SEARCH FOR YOUR
                <span className="text-[#1cbcba] text-base sm:text-xl font-extrabold">
                  {" "}
                  COLOR
                </span>
              </h4>
            )}
            <button
              className="rounded-full w-10 h-10 border flex justify-center items-center border-black hover:bg-white hover:border-black"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <Search
            remove={remove}
            setRemove={setRemove}
            isAdvSearch={isAdvSearch}
            setIsAdvSearch={setIsAdvSearch}
          />
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}
    </div>
  );
};
