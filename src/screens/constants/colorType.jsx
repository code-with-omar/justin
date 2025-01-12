import { useState } from "react";
import axios from "axios";

import allColors from "../../assets/all-colors.png";
import { useColorGroup } from "./useSteps";
import { useModal } from "./../../contexts/Modal";

export const ColorsType = ({ setAdvanceSearch }) => {
  const {
    setStep,
    stepsValue,
    setStepsValue,
    setIsLoading,
    isSidebarCollapsed,
    advanceStep,
    setAdvanceStep,
  } = useModal();
  const { data: colorsData } = useColorGroup();

  const enhancedColorsData = [
    { name: "All Colors", image: allColors, clrName: "Black" },
    ...(Array.isArray(colorsData) ? colorsData : []),
  ];
  const handleColor = () => {
    setStep("2");
    setAdvanceStep("4");
  };

  const handleSeletedColor = async (color) => {
    setStepsValue((prevState) => ({
      ...prevState,
      colour_group: color,
    }));

    if (!stepsValue?.modelId && !color) {
      console.warn("Missing required parameters for advance search");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://luna-paint-api-m67qj3xqea-uc.a.run.app/advanced-search/",
        {
          params: {
            ...(stepsValue?.modelId && { model_id: stepsValue.modelId }),
            ...(color && { colour_group: color }),
          },
        }
      );

      setAdvanceSearch(response.data);
    } catch (err) {
      console.error("Advance Search Error:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 xl:p-10 xl:flex xl:flex-col xl:w-full">
      <div className="pb-2 px-4 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-3 overflow-y-auto max-h-[65vh] scroll-bar">
        {enhancedColorsData?.map((tile, index) => (
          <div
            key={index}
            className="card border-[0.5px] border-secondary bg-white rounded-xl cursor-pointer"
            onClick={() => handleSeletedColor(tile.rgb)}
          >
            <figure
              className="flex m-auto rounded-lg h-[120px] md:h-[150px] xl:shrink-0 w-full overflow-hidden "
              onClick={handleColor}
            >
              {tile.image ? (
                <img
                  src={tile.image}
                  alt={tile.name || "Color option"}
                  className="w-full h-full object-cover"
                />
              ) : tile.rgb ? (
                <div
                  style={{ backgroundColor: `rgb(${tile.rgb})` }}
                  className="w-full h-full"
                />
              ) : null}
            </figure>
            <div className="card-body p-2">
              <h3 className="card-title text-center text-sm md:text-base xl:text-lg">
                {tile.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
