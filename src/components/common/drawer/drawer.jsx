import React, { useEffect, useState } from "react";
import { CloseIcon } from "../svgs";
import { useModal } from "../../../contexts/Modal";

export default function Drawer({ isOpen, onClose, children }) {
  const [isMobile, setIsMobile] = useState(false);
  const { closeModal } = useModal();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const drawerStyle = {
    position: "fixed",
    top: isMobile ? "auto" : "0",
    right: isMobile ? "0" : "0",
    bottom: isMobile ? "0" : "auto",
    width: isMobile ? "100%" : "90%",
    height: "100%",
    backgroundColor: "#1cbcba",
    zIndex: 50,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s",
    transform: isOpen
      ? isMobile
        ? "translateY(0)" // Bottom-to-top for mobile
        : "translateX(0)" // Right-to-left for desktop
      : isMobile
      ? "translateY(100%)" // Slide out to the bottom
      : "translateX(100%)", // Slide out to the right
    borderTopLeftRadius: isOpen && isMobile ? "1rem" : "0",
    borderTopRightRadius: isOpen && isMobile ? "1rem" : "0",
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-all duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer Content */}
      <div style={drawerStyle}>
        <div className="p-4">{children}</div>
        <div className="flex justify-between items-center p-5 pr-7">
          <button
            className="btn btn-circle btn-outline ml-auto border-black hover:bg-white hover:border-black"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  );
}
