import { useState } from "react";
import axios from "axios";

import allColors from "../../assets/all-colors.png";
import { useColorGroup } from "./useSteps";
import { useModal } from "./../../contexts/Modal";

export const ColorsType = ({ setAdvanceSearch, setRemove }) => {
  const { setStep, stepsValue, setStepsValue, setIsLoading } = useModal();
  const { data: colorsData } = useColorGroup();

  // Enhance the colors data by adding "All Colors" option
  const enhancedColorsData = [
    { name: "All Colors", image: allColors, clrName: "Black" },
    ...(Array.isArray(colorsData) ? colorsData : []),
  ];

  console.log("Enhanced Colors Data:", enhancedColorsData);
  console.log(enhancedColorsData);
  // Function to handle when a color is selected
  // const handleSeletedColor = async (color) => {
  //   setRemove(false);
  //   setStepsValue((prevState) => ({
  //     ...prevState,
  //     colour_group: color,
  //   }));

  //   if (!stepsValue?.modelId && !color) {
  //     console.warn("Missing required parameters for advance search");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(
  //       "https://luna-paint-api-m67qj3xqea-uc.a.run.app/advanced-search/",
  //       {
  //         params: {
  //           ...(stepsValue?.modelId && { model_id: stepsValue.modelId }),
  //           ...(color && { colour_group: color }),
  //         },
  //       }
  //     );
  //     console.log("Advanced Search Response:", response.data);
  //     setAdvanceSearch(response.data);
  //   } catch (err) {
  //     console.error("Advance Search Error:", err.response?.data || err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="cc-p-4 xl:cc-p-10 xl:cc-flex xl:cc-flex-col xl:cc-w-[100%]">
      <div className="cc-pb-2 cc-px-4 cc-grid cc-gap-4 cc-grid-cols-2 md:cc-grid-cols-3 xl:cc-grid-cols-3 cc-overflow-y-auto cc-max-h-[65vh] scroll-bar">
        {enhancedColorsData?.map((tile, index) => (
          // <div
          //   key={index}
          //   className="cc-p-2 cc-cursor-pointer cc-border-[0.5px] cc-border-secondary cc-bg-white cc-rounded-xl cc-space-y-3"
          //   onClick={() => handleSeletedColor(tile.rgb)}
          // >

          <div
            key={index}
            className="cc-p-2 cc-cursor-pointer cc-border-[0.5px] cc-border-secondary cc-bg-white cc-rounded-xl cc-space-y-3"
          >
            {/* <div
              className={`cc-flex cc-m-auto cc-flex-col cc-rounded-lg cc-h-[120px] md:cc-h-[150px] cc-cursor-pointer xl:cc-shrink-0 ${
                tile.clrName === "White" &&
                "cc-border-2 cc-border-solid cc-border-gray-950"
              }`}
              style={{
                ...(tile.image
                  ? {
                      backgroundImage: `url(${tile.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {
                      backgroundColor: `rgb(${tile.rgb})`,
                    }),
              }}
            /> */}
            <p>${tile.image}</p>
            <p>${tile.rgb}</p>
            <div className="cc-px-1 cc-pb-1">
              <h3>{tile.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
