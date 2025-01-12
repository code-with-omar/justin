import { useModal } from "../../contexts/Modal";
import React, { useCallback, useEffect, useState } from "react";
import ResultCard from "./resultCard";
const NO_IMAGE =
  "https://storage.googleapis.com/luna-colors/lib/no-image-xs.png";
export default function SearchResults({
  imageQueries,
  data,
  onColorClick,
  searchQuery,
  setSearchTerms,
  setShowInitialSearch,
  searchBy,
  setIsSidebarCollapsed,
  form,
  title,
  buttonPrimary,
  buttonSecondary,
}) {
  const {
    setStep,
    step,
    setHasSearchValue,
    isDesktop,
    isLoading,
    resultCard,
    setResultCard,
    setSearchStep,
  } = useModal();

  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (!data?.length) {
      setShowModal(true);
    }
  }, [data]);
  const getColorImage = useCallback(
    (color) => {
      const query = imageQueries.find((query) => query?.data?.id === color.id);

      if (query?.data?.path) {
        return `url('${query?.data?.path}')`;
      }

      if (color.rgb) {
        return `rgb(${color.rgb})`;
      }

      return `url('${NO_IMAGE}')`;
    },
    [imageQueries]
  );
  const handleColor = (color) => {
    onColorClick(color);
    setResultCard("2");
    setStep("3");
    setSearchStep("2");
  };
  useEffect(() => {
    // Function to check the screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // Call the function on initial render
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`mt-8 w-full ${isMobile ? "overflow-y-auto h-screen" : ""}`}
    >
      <div className="">
        {step == "1" && { title }}

        {form}
        <div className="flex justify-between mt-4 px-8 gap-4">
          {buttonPrimary}
          {buttonSecondary}
        </div>
      </div>
      <div
        className={`mt-8 p-0 w-full bg-background ${
          isMobile ? "" : "overflow-y-auto h-screen"
        }`}
      >
        <div className="p-4 gap-x-4 gap-y-6 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-8 mb-10 ">
          {data?.map((color, index) => (
            <ResultCard
              key={index}
              color_code={color.code}
              color_name={color.name}
              brand={color.fullBrand}
              year_range={color.year}
              imageurl={getColorImage(color)}
              onClick={() => handleColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
