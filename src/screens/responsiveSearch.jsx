import React, { useState, useEffect } from "react";
import { useModal } from "../contexts/Modal"; // Adjust the path to your ModalContext
import { CloseIcon } from "../components/common/svgs";

export const ResponsiveSearch = () => {
  const {
    isOpen,
    step,
    isDesktop,
    openModal,
    closeModal,
    setStep,
    setShowInitialSearch,
    setHasSearchValue,
    isLoading,
    setIsSidebarCollapsed,
  } = useModal();

  const [isAdvSearch, setIsAdvSearch] = useState(false);
  const [remove, setRemove] = useState(false);

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

  const handleResultsBack = () => {
    if (isAdvSearch) {
      setStep("4");
      setRemove(true);
      setShowInitialSearch(true);
      setHasSearchValue(false);
      setIsSidebarCollapsed(false);
    } else {
      setStep("1");
      setShowInitialSearch(true);
      setHasSearchValue(false);
      setIsSidebarCollapsed(false);
    }
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="bg-white ">
      <div
        className={`fixed z-50 bg-white text-black transition-transform duration-300 ${
          isOpen
            ? isDesktop
              ? "translate-x-0 rounded-tl-[3rem]" // Desktop: Slide in from right
              : "translate-y-0 rounded-xl" // Mobile: Slide in from bottom
            : isDesktop
            ? "translate-x-full"
            : "translate-y-full"
        } md:bottom-auto md:top-0 md:right-0 md:w-[60%] w-full h-full md:h-screen flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 pr-7 ">
          <button
            className="btn btn-circle btn-outline  ml-auto border-black hover:bg-white hover:border-black"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {step === "1" && (
            <>
              <input
                type="text"
                placeholder="Search by color name or code (e.g., LY7C or Nardo)"
                className="input input-bordered w-full mb-4"
                // onChange={(e) => setHasSearchValue(!!e.target.value.trim())}
              />
              <div className="flex gap-4">
                <button
                  className="btn btn-accent w-1/2"
                  // onClick={() => setStep("2")}
                >
                  Search By Make
                </button>
                <button
                  className="btn btn-outline w-1/2"
                  // onClick={() => alert("Search Tips")}
                >
                  Search Tips
                </button>
              </div>
            </>
          )}
          {step === "2" && (
            <div>
              <h3 className="text-xl mb-4">Step 2: Select Make/Model</h3>
              <button
                className="btn btn-primary w-full"
                // onClick={handleResultsBack}
              >
                Back to Step 1
              </button>
            </div>
          )}
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
