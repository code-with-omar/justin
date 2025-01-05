import { useState } from "react";
import Logo from "../../assets/new-logo-trans.png"; // Make sure the path is correct
import { useModal } from "../../contexts/Modal";
import { ArrowForward } from "../../components/common/svgs"; // Assuming ArrowForward is an SVG component

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
        className="flex items-center justify-center flex-col sm:flex-row"
        onSubmit={(e) => e.preventDefault()} // Prevent page reload on form submit
      >
        <div className="bg-background flex items-center p-2 rounded-xl">
          {/* Text Input */}
          <input
            type="text"
            name="q"
            id="query"
            onChange={handleInputChange}
            value={searchInput}
            placeholder="Search by color name or code (e.g. LY7C or Nardo)"
            className="bg-background w-64 h-12 p-4 text-sm placeholder:text-xs sm:w-[400px] md:text-base md:placeholder:text-sm border-none focus:outline-none"
          />

          {/* Search Button */}
          <div
            className="bg-primary flex items-center justify-center rounded-full w-10 h-10 ml-2 cursor-pointer hover:bg-opacity-80"
            onClick={handleSearch}
          >
            <ArrowForward className="w-6 h-6" />
          </div>
        </div>
      </form>
    </div>
  );
}
