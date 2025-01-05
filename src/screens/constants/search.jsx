import { useState } from "react";
import Logo from "../../assets/new-logo-trans.png"; // Make sure the path is correct
import { useModal } from "../../contexts/Modal";
import { ArrowForward } from "../../components/common/svgs"; // Assuming ArrowForward is an SVG component

import Button from "../../components/common/button/button";

export default function Search({
  setIsAdvSearch,
  isAdvSearch,
  remove,
  setRemove,
  ...rest
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerms, setSearchTerms] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [resultsLoader, setResultsLoader] = useState(false);
  const [searchBy, setSearchBy] = useState("all");
  const [tipsDrawerOpen, setTipDrawerOpen] = useState(false);
  const [advSearchResults, setAdvSearchResults] = useState();

  const {
    step,
    setIsLoading,
    isLoading,
    setStep,
    hasSearchValue,
    setHasSearchValue,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isDesktop,
    stepsValue,
  } = useModal();

  const handleSearch = () => {
    // Your handle search logic
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-page-wrapper flex flex-col justify-center items-center border-0 overflow-x-hidden overflow-y-scroll p-0 w-full h-full md:border-0 md:overflow-y-hidden xl:flex-col">
      <div className="mb-2 flex justify-center">
        {/* Correct way to render the image */}
        <img className="w-56" src={Logo} alt="Logo" />
      </div>

      <h4 className="text-[#343434] text-center mb-4 font-extrabold text-xl mt-2 uppercase">
        SEARCH FOR YOUR
        <span className="text-[#1cbcba] text-xl font-extrabold"> COLOR</span>
      </h4>

      <form
        id="advanced-search-form"
        className="flex flex-col sm:flex-row items-center justify-center"
        onSubmit={(e) => e.preventDefault()} // Prevent page reload on form submit
      >
        <div className="form-control flex flex-row items-center bg-background p-2 rounded-xl">
          {/* Text Input */}
          <input
            type="text"
            name="q"
            id="query"
            onChange={handleInputChange}
            value={searchInput}
            placeholder="Search by color name or code (e.g. LY7C or Nardo)"
            className="input input-bordered bg-background text-sm placeholder:text-xs sm:w-[400px] md:text-base md:placeholder:text-sm w-64 h-12 focus:outline-none border-none"
          />

          {/* Search Button */}
          <button
            type="button"
            className=" bg-primary hover:bg-primary-focus rounded-full w-10 h-10 ml-2 flex items-center justify-center"
            onClick={handleSearch}
          >
            <ArrowForward className="w-6 h-6 text-white" />
          </button>
        </div>
      </form>

      <div className="flex w-full items-center pt-2 gap-2 md:mt-6">
        <div className="flex w-full gap-2 mt-2">
          <button className="button-primary outlined-button-primary btn">
            Search By Make
          </button>
          <button className="button-secondary outlined-secondary btn">
            Search By Make
          </button>
        </div>
      </div>
    </div>
  );
}
