import React from "react";
import searchIcon from "../../../assets/searchIcon.png";
import { useModal } from "./../../../contexts/Modal";

export const RedirectDrawer = ({ isMobile }) => {
  const { searchTerms, setStep } = useModal();
  const handleSearch = () => {
    setStep("1");
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      searchTerms
    )} color code`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {isMobile && (
        <div className="p-10 text-[#ffffff] flex flex-col justify-center ">
          <h3 className="text-[14px] md:text-[18px]  text-center font-black uppercase font-heading">
            Hey! WE CAN’T SEEM TO FIND THE COLOR YOU ARE LOOKING FOR...
          </h3>
          <p className="mt-8 text-center">
            Let’s use Google to try and help you find the correct color so you
            can search again.
          </p>

          <div className="mx-auto mt-5">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center w-fit border rounded p-2 text-[14px] mt-2 hover:bg-primary hover:text-white"
            >
              <img
                src={searchIcon}
                alt="Search icon"
                className="h-5 w-5 mr-4 rotate-icon md:w-6 md:h-6"
              />
              Search Google
            </button>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="text-[#ffffff] flex  justify-center ">
          <div className="h-screen flex justify-center items-center pl-2">
            <div className=" mx-auto h-[100px] w-2 rounded-full bg-white "></div>
          </div>
          <div className="p-8 h-[95vh] flex flex-col justify-center">
            <div className="p-10 text-[#ffffff] flex flex-col justify-center ">
              <h3 className="text-[14px] md:text-[18px]  text-center font-black uppercase font-heading">
                Hey! WE CAN’T SEEM TO FIND THE COLOR YOU ARE LOOKING FOR...
              </h3>
              <p className="mt-8 text-center">
                Let’s use Google to try and help you find the correct color so
                you can search again.
              </p>

              <div className="mx-auto mt-5">
                <button
                  onClick={handleSearch}
                  className="flex items-center justify-center w-fit border rounded p-2 text-[14px] mt-2 hover:bg-primary hover:text-white"
                >
                  <img
                    src={searchIcon}
                    alt="Search icon"
                    className="h-5 w-5 mr-4 rotate-icon md:w-6 md:h-6"
                  />
                  Search Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
