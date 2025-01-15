import React from "react";
import searchIcon from "../../assets/searchIcon.png";
import { useModal } from "../../contexts/Modal";

export const RedirectDrawer = ({ searchQuery, setSearchTerms, searchBy }) => {
  const { setStep, setHasSearchValue, setIsLoading } = useModal();

  const handleSearch = () => {
    setHasSearchValue(false);
    setIsLoading(false);
    setSearchTerms({ q: "" });
    setStep("1");
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      searchQuery.q
    )} color code`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center justify-start h-full p-10 pt-20">
      <div className="relative w-full rounded-lg">
        <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t bg-base-200">
          <h3 className="text-[14px] md:text-[18px] text-white font-black uppercase font-heading text-center">
            Hey! WE CAN’T SEEM TO FIND THE COLOR YOU ARE LOOKING FOR...
          </h3>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 md:px-5">
          <p className="text-[12px] md:text-[16px] text-center">
            Let’s use Google to try and help you find the correct color{" "}
            {searchBy} so you can search again.
          </p>
          <button
            onClick={handleSearch}
            className="flex items-center w-fit border rounded p-2 text-[14px] mt-2 hover:bg-primary hover:text-white"
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
  );
};
