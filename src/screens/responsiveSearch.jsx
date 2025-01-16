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
    isSearching,
    isRedirectDrawer,
    setIsRedirectDrawer,
  } = useModal();

  const [isAdvSearch, setIsAdvSearch] = useState(false);
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
      onClick={() => setIsTipsDrawerOpen(true)}
    >
      Search Tips
    </button>
  );

  return (
    <div className="bg-white">
      {/* Main Drawer */}
      <div style={DrawerStyle(isOpen, isMobile)}>
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
            <button className="invisible" onClick={closeModal}>
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
            setError={setError}
          />
        </div>
      </div>
      {/* Secondary Drawer */}
      <div style={TipsErrorDrawerStyle(isTipsDrawerOpen, isMobile)}>
        {!isMobile && (
          <div className="flex ml-auto">
            <button
              className="btn btn-circle btn-outline border-black hover:bg-white hover:border-black"
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
