import React, { useState, useEffect } from "react";
import { useModal } from "../contexts/Modal"; // Adjust the path to your ModalContext
import { CloseIcon, ArrowBack } from "../components/common/svgs";
import Search from "./constants/search";
import TipsDrower from "./../components/common/tipsDrower/tipsDrower";
import { TipsErrorDrawerStyle } from "./../components/common/style";
import { DrawerStyle } from "./constants/style";
import ErrorDrower from "./../components/common/errorDrower/errorDrower";
import { RedirectDrawer } from "./../components/common/redirectDrawer/redirectDrawer";

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
    isRedirectDrawer,
    setIsRedirectDrawer,
    advanceStep,
    setAdvanceStep,
    initialAdvance,
    setInitialAdvance,
    isMobile,
    setIsMobile,
  } = useModal();

  const [isAdvSearch, setIsAdvSearch] = useState(false);
  const [error, setError] = useState(false);
  const [isTipsDrawerOpen, setIsTipsDrawerOpen] = useState(false);

  useEffect(() => {
    window.openSearch = (baseUrl = "") => {
      openModal();
      console.log("Search opened with base URL: ", baseUrl);
    };

    return () => {
      delete window.openSearch;
    };
  }, [openModal]);

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
  const handlePreviousAdvancsStep = () => {
    if (resultCard === "2") {
      setResultCard("1");

      return; // Exit early, so advanceStep doesn't decrease
    }
    setAdvanceStep((prevStep) => {
      if (prevStep <= 1) {
        setInitialAdvance(false);
        setStep("1");
        setResultCard("1");
        return 0;
      }

      setIsRedirectDrawer(false);
      setInitialAdvance(true);
      return prevStep - 1;
    });
  };

  const searchColor = (
    <h4 className="text-[#343434] text-center font-extrabold text-lg sm:text-xl flex-1 uppercase">
      SEARCH FOR YOUR
      <span className="text-[#1cbcba] text-lg font-extrabold sm:text-xl">
        {" "}
        COLOR
      </span>
    </h4>
  );

  const comfrimColor = (
    <h4 className="text-[#343434] text-center font-extrabold text-xl flex-1 uppercase">
      COMFRIM YOUR
      <span className="text-[#1cbcba] text-xl font-extrabold"> COLOR</span>
    </h4>
  );
  const advanceSearchTitle = (
    <h4 className="text-[#343434] text-center font-extrabold text-xl flex-1 uppercase">
      Advanced
      <span className="text-[#1cbcba] text-xl font-extrabold"> search</span>
    </h4>
  );
  const buttonSecondary = (
    <button
      className="btn rounded-full bg-white text-[#0d1120] font-normal capitalize border border-black w-1/2 hover:bg-[#1cbcba] hover:text-white hover:border-[#1cbcba] text-[12px] sm:text-base"
      onClick={() => setIsTipsDrawerOpen(true)}
    >
      Search Tips
    </button>
  );

  return (
    <div className="bg-white">
      {/* Main Drawer */}
      <div style={DrawerStyle(isOpen, isMobile)}>
        <div>
          {isMobile && isOpen && (
            <div className="mx-auto my-2 sm:my-4 h-2 w-[100px] rounded-full bg-teal-400"></div>
          )}
          <div
            className={`flex justify-between items-center px-5 py-2 pr-7 ${
              !isMobile ? "rounded-tl-[3rem]" : ""
            } ${
              (!initialAdvance && (step == "2" || step == "3")) ||
              initialAdvance
                ? "bg-[#F0EFF0]"
                : "bg-white"
            }`}
          >
            {!initialAdvance && (step == "2" || step == "3") && (
              <button
                className="btn btn-circle btn-outline border-black hover:bg-white hover:border-black"
                onClick={handleAllStep}
              >
                <ArrowBack />
              </button>
            )}
            {initialAdvance && (
              <button
                className="btn btn-circle btn-outline border-black hover:bg-white hover:border-black"
                onClick={handlePreviousAdvancsStep}
              >
                <ArrowBack />
              </button>
            )}

            {!initialAdvance && step == "2" && searchColor}
            {!initialAdvance && step == "3" && comfrimColor}
            {initialAdvance && advanceStep <= 3 && advanceSearchTitle}
            {initialAdvance &&
              advanceStep == 4 &&
              resultCard === "1" &&
              searchColor}
            {initialAdvance &&
              advanceStep == 4 &&
              resultCard === "2" &&
              comfrimColor}
            {!isMobile && (
              <button
                className={`btn btn-circle btn-outline ml-auto  border-black hover:bg-white hover:border-black ${
                  isMobile ? "invisible" : "visible"
                }`}
                onClick={closeModal}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <Search
            isAdvSearch={isAdvSearch}
            setIsAdvSearch={setIsAdvSearch}
            buttonSecondary={buttonSecondary}
            setError={setError}
          />
        </div>
      </div>

      {/* Secondary Drawer */}
      <div style={TipsErrorDrawerStyle(isTipsDrawerOpen, isMobile)}>
        {!isMobile && (
          <div className="flex ml-auto pr-7 py-2">
            <button
              className="btn btn-circle btn-outline border-white hover:bg-white"
              onClick={() => setIsTipsDrawerOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <div className="">
          {isMobile && (
            <div className="mx-auto mb-4 mt-4 h-2 w-[100px] rounded-full bg-white"></div>
          )}
          <TipsDrower isMobile={isMobile}></TipsDrower>
        </div>
      </div>
      {/* Error drower */}
      <div style={TipsErrorDrawerStyle(error, isMobile)}>
        {isMobile && (
          <div className="mx-auto mb-4 mt-4 h-2 w-[100px] rounded-full bg-white"></div>
        )}
        <ErrorDrower isMobile={isMobile}></ErrorDrower>
      </div>
      {/* isRedirectDrawer */}
      <div style={TipsErrorDrawerStyle(isRedirectDrawer, isMobile)}>
        {!isMobile && (
          <div className="flex ml-auto pr-7 py-2">
            <button
              className="btn btn-circle btn-outline border-white hover:bg-white"
              onClick={() => setIsRedirectDrawer(false)}
            >
              <CloseIcon />
            </button>
          </div>
        )}
        {isMobile && (
          <div className="mx-auto mb-4 mt-4 h-2 w-[100px] rounded-full bg-white"></div>
        )}
        <RedirectDrawer isMobile={isMobile} />
      </div>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeModal}
        ></div>
      )}
      {isTipsDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsTipsDrawerOpen(false)}
        ></div>
      )}
      {isRedirectDrawer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsRedirectDrawer(false)}
        ></div>
      )}
      {error && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setError(false)}
        ></div>
      )}
    </div>
  );
};
