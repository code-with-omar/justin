import React, { useState, useEffect } from "react";
import { useModal } from "../../contexts/Modal";
import { CloseIcon } from "../../components/common/svgs";
import Search from "../constants/search";

export const Tips = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const [isAdvSearch, setIsAdvSearch] = useState(false);

  const [isMobile, setIsMobile] = useState(false); // Start with false, will be updated in useEffect

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900); // Update state on resize
    };

    handleResize(); // Check the initial window width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
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

  return (
    <div className="bg-[]">
      <div style={modalStyle}>
        {/* Visual indicator only for mobile */}
        {isMobile && isOpen && (
          <div className="mx-auto mb-4 mt-4 h-2 w-[100px] rounded-full bg-teal-400"></div>
        )}

        {/* Header: Visible only on desktop */}
        {!isMobile && (
          <div className="flex justify-between items-center p-5 pr-7">
            <button
              className="btn btn-circle btn-outline ml-auto border-black hover:bg-white hover:border-black"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4">
          <Search isAdvSearch={isAdvSearch} setIsAdvSearch={setIsAdvSearch} />
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
