import { useState, useRef, useEffect, useCallback } from "react";
import Logo from "../../assets/new-logo-trans.png";
import { useModal } from "../../contexts/Modal";
import { ArrowForward } from "../../components/common/svgs";
import useLunaSearch from "../../hooks/useLunaSearch";
import useRecipeImages from "../../hooks/useRecipeImages";
import useLunaRecipe from "../../hooks/useLunaRecipe";
import { useShopifyCreateProduct } from "../../hooks/useShopifyCreateProduct";
import Loader from "../../components/common/loader/loader";
import SearchResults from "./searchResults";
import ConfirmColor from "./confirmColor";
import SelectBrand from "./selectBrand";
import SelectModel from "./selectModel";
import { ColorsType } from "./colorType";
import AdvanceStepWrap from "./advanceStepWrap";
const advancedWrapStep = ["Select Make", "Select Model", "Select Color"];
const NO_IMAGE =
  "https://storage.googleapis.com/luna-colors/lib/no-image-xs.png";

export default function Search({ buttonSecondary, setError, ...rest }) {
  const [tipsDrawerOpen, setTipsDrawerOpen] = useState(false);
  const [searchBy, setSearchBy] = useState("all");
  const [selectedColor, setSelectedColor] = useState(null);
  const [resultsLoader, setResultsLoader] = useState(false);
  const [showInitialSearch, setShowInitialSearch] = useState(true);
  const [advSearchResults, setAdvSearchResults] = useState();

  const {
    step,
    isLoading,
    setStep,
    resultCard,
    setResultCard,
    initialAdvance,
    setInitialAdvance,
    advanceStep,
    isSearching,
    setIsSearching,
    setAdvanceStep,
    searchTerms,
    setSearchTerms,
  } = useModal();

  const searchInputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = searchInputRef.current.value;
    if (searchInput == "") {
      alert("Please enter value");
    } else {
      setStep("1");
      setResultCard("1");
      setSearchTerms(searchInput);
      setIsSearching(true);
      setInitialAdvance(false);
    }
  };

  const { data: searchResults, isFetching: isSearchResultsFetching } =
    useLunaSearch(searchTerms, searchBy);

  // Monitor search result fetching status to toggle isSearching
  useEffect(() => {
    if (!isSearchResultsFetching && isSearching && !isRecipeError) {
      setIsSearching(false);
      setStep("2");
      setInitialAdvance();
    }
  }, [isSearchResultsFetching, isSearching, setStep]);

  const imageQueries = useRecipeImages(searchResults);
  const {
    data: recipeData,
    isFetching: isRecipeFetching,
    isLoading: isRecipeLoading,
    isError: isRecipeError,
    error,
  } = useLunaRecipe(selectedColor?.parentId);
  const { mutate: createProduct, ...mutationProps } = useShopifyCreateProduct();
  const undercoatImage = useRecipeImages([
    { id: recipeData?.undercoatId, parentId: recipeData?.undercoatId },
  ]);
  if (isRecipeError) {
    setError(true);
  }
  const getUndercoatImg = (color, withUrl = true) => {
    const query = undercoatImage.find(
      (query) => query?.data?.id === color.undercoatId
    );
    if (query?.data?.path) {
      if (withUrl) {
        return `url('${query?.data?.path}')`;
      } else {
        return query?.data?.path;
      }
    }

    if (color?.rgb) {
      return `rgb(${color?.rgb})`;
    }

    if (withUrl) {
      return `url('${NO_IMAGE}')`;
    }

    return NO_IMAGE;
  };
  const getColorImage = useCallback(
    (color, withUrl = true) => {
      const query = imageQueries.find((query) => query?.data?.id === color.id);

      if (query?.data?.path) {
        return withUrl ? `url('${query?.data?.path}')` : query?.data?.path;
      }

      if (color.rgb) {
        return `rgb(${color.rgb})`;
      }

      return withUrl ? `url('${NO_IMAGE}')` : NO_IMAGE;
    },
    [imageQueries]
  );
  const onColorClick = useCallback((color) => {
    setSelectedColor(color);
  }, []);
  const onRecipeClick = useCallback(() => {
    if (mutationProps.isPending) {
      return;
    }

    if (!recipeData) {
      console.log("No formula found for the selected color");
      return;
    }

    let color_code = selectedColor.code;
    if (selectedColor.refCode != "") {
      color_code += ` / ${selectedColor.refCode}`;
    }
    // TODO:2 getUndercoatImg
    const productData = {
      color_code: color_code,
      color_name: selectedColor.name,
      price_tag: recipeData.suffix,
      imgSrc: getColorImage(selectedColor, false),
      imgAlt: `${selectedColor.code} - ${selectedColor.name}`,
      year: selectedColor.year,
      brand: selectedColor.fullBrand,
      undercoat: recipeData.undercoat,
      undercoat_image: recipeData.undercoatId
        ? getUndercoatImg(recipeData, false)
        : "",
      undercoat_price_tag: recipeData.undercoatSuffix
        ? recipeData.undercoatSuffix
        : "",
      tricoat: recipeData?.tricoat,
      candy: recipeData.candy,
      xyralic: recipeData.xyralic,
      silver: recipeData.silver,
    };
    createProduct(productData);
  }, [recipeData, selectedColor, undercoatImage, imageQueries]);
  const formComponent = (
    <form
      id="advanced-search-form"
      className="flex flex-col sm:flex-row items-center justify-center"
      onSubmit={handleSearch}
    >
      <div className="form-control flex flex-row items-center bg-background p-2 rounded-xl">
        <input
          type="text"
          name="q"
          id="query"
          placeholder="Search by color name or code (e.g. LY7C or Nardo)"
          className="input input-bordered bg-background text-sm placeholder:text-[8px] sm:placeholder:text-sm sm:w-[400px] md:text-base md:placeholder:text-sm w-64 h-12 focus:outline-none border-none"
          ref={searchInputRef}
        />

        <button
          type="submit"
          className="bg-primary hover:bg-primary-focus rounded-full w-10 h-10 ml-2 flex items-center justify-center"
        >
          <ArrowForward className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
  const buttonPrimary = (
    <button
      className="btn rounded-full bg-[#0d1120] text-white  font-normal capitalize border border-black hover:bg-white hover:text-[#1cbcba] hover:border-[#1cbcba] text-[12px] md:text-base w-1/2"
      onClick={() => setInitialAdvance(true)}
    >
      Search By Make
    </button>
  );
  // const buttonSecondary = (
  //   <button
  //     className="btn rounded-full bg-white text-[#0d1120]  font-normal capitalize border border-black w-1/2 hover:bg-[#1cbcba] hover:text-white hover:border-[#1cbcba] text-[12px] sm:text-base"
  //     onClick={toggleTipsDrawer}
  //   >
  //     Search Tips
  //   </button>
  // );
  const title = (
    <h4 className="text-[#343434] text-center mb-4 font-extrabold text-xl mt-3 uppercase">
      SEARCH FOR YOUR
      <span className="text-[#1cbcba] text-xl font-extrabold"> COLOR</span>
    </h4>
  );
  const advancedHeader = (
    <div className="py-6 flex justify-center flex-col px-5">
      <div className="flex items-center space-x-6 w-full justify-center">
        {advancedWrapStep.map((label, index) => (
          <div
            key={label}
            className="flex items-center justify-between space-x-2"
          >
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                index < advanceStep
                  ? "bg-blue-600" // Completed step
                  : index === advanceStep
                  ? "bg-blue-900" // Active step
                  : "bg-gray-200 text-gray-400" // Future step
              }`}
            >
              {index < advanceStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {/* Connector Line */}
            {index !== advancedWrapStep.length - 1 && (
              <div
                className={`h-0.5 flex-grow ${
                  index < advanceStep
                    ? "bg-blue-900" // Line for completed steps
                    : "bg-gray-200" // Line for future steps
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm font-medium">
        {advancedWrapStep.map((label, index) => (
          <span
            key={label}
            className={`${
              index === advanceStep
                ? "text-blue-900 font-bold" // Active step text
                : index < advanceStep
                ? "text-black" // Completed step text
                : "text-gray-400" // Future step text
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
  // const handlePreviousStep = () => {
  //   setAdvanceStep(advanceStep - 1);
  // };
  // <div className="relative flex flex-col justify-center items-center border-0 overflow-x-hidden overflow-y-scroll p-0 w-full h-full md:border-0 md:overflow-y-hidden xl:flex-col">
  return (
    <div className="parentWrapper">
      {/* Show loader during search submission */}
      {isSearching ? (
        <div>
          <div className="top-full">
            {title}
            {formComponent}
            <div className="flex items-center pt-3 gap-2 md:mt-6 w-64 justify-between mx-auto sm:w-[400px]">
              {buttonPrimary}
              {buttonSecondary}
            </div>
            <Loader />
          </div>
        </div>
      ) : (step === "2" || step === "3") && searchResults && !initialAdvance ? (
        <div className="absolute w-full">
          <div className="flex justify-between items-center pl-7"></div>
          <div>
            {!isLoading && !isSearchResultsFetching && resultCard == "1" && (
              <SearchResults
                className="h-[calc(100vh-22rem)]"
                isFetching={isLoading}
                isSearching={isSearching}
                imageQueries={imageQueries}
                data={searchResults}
                onColorClick={onColorClick}
                searchQuery={searchTerms}
                setResultsLoading={setResultsLoader}
                setSearchTerms={setSearchTerms}
                setShowInitialSearch={setShowInitialSearch}
                recipeData={recipeData}
                searchBy={searchBy}
                resultsLoader={resultsLoader}
                form={formComponent}
                title={title}
                buttonPrimary={buttonPrimary}
                buttonSecondary={buttonSecondary}
              />
            )}
            {isRecipeLoading || isRecipeFetching || resultsLoader ? (
              <Loader />
            ) : (
              !isRecipeError &&
              resultCard === "2" && (
                <ConfirmColor
                  selectedColor={selectedColor}
                  onRecipeClick={onRecipeClick}
                  getColorImage={getColorImage}
                  recipeData={recipeData}
                  imageQueries={imageQueries}
                  getUndercoatImg={getUndercoatImg}
                />
              )
            )}
          </div>
        </div>
      ) : initialAdvance ? (
        <div className="w-full">
          {/* <button className="btn" onClick={handlePreviousStep}>
            back
          </button> */}
          {advancedHeader}
          {advanceStep === "1" ? (
            <SelectBrand />
          ) : advanceStep === "2" ? (
            <SelectModel />
          ) : advanceStep === "3" ? (
            <ColorsType setAdvanceSearch={setAdvSearchResults} />
          ) : (
            advanceStep === "4" &&
            (step === "2" || step === "3") &&
            searchResults && (
              <div className="absolute w-full">
                <div className="flex justify-between items-center pl-7"></div>
                <div>
                  {!isLoading &&
                    !isSearchResultsFetching &&
                    resultCard === "1" && (
                      <SearchResults
                        className="h-[calc(100vh-22rem)]"
                        isFetching={isLoading}
                        imageQueries={imageQueries}
                        data={advSearchResults}
                        onColorClick={onColorClick}
                        searchQuery={searchTerms}
                        setResultsLoading={setResultsLoader}
                        setSearchTerms={setSearchTerms}
                        setShowInitialSearch={setShowInitialSearch}
                        recipeData={recipeData}
                        searchBy={searchBy}
                        resultsLoader={resultsLoader}
                        form={formComponent}
                        title={title}
                        buttonPrimary={buttonPrimary}
                        buttonSecondary={buttonSecondary}
                      />
                    )}
                  {isRecipeLoading || isRecipeFetching || resultsLoader ? (
                    <Loader />
                  ) : (
                    !isRecipeError &&
                    resultCard === "2" && (
                      <ConfirmColor
                        selectedColor={selectedColor}
                        onRecipeClick={onRecipeClick}
                        getColorImage={getColorImage}
                        recipeData={recipeData}
                        imageQueries={imageQueries}
                        getUndercoatImg={getUndercoatImg}
                      />
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-[18%] md:pt-[10%]">
          <div className="flex flex-col justify-center items-center pt-3 gap-2 md:mt-6 mx-auto sm:w-[400px]">
            <img className="w-56" src={Logo} alt="Logo" />
            {title}
            {formComponent}
            <div className="flex items-center pt-3 gap-2 md:mt-6 w-full justify-between">
              {buttonPrimary}
              {buttonSecondary}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
