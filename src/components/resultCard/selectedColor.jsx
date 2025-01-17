import React, { useEffect, useState } from "react";
import { Check, TickIcon } from "../../../src/components/common/svgs/index";
import gallonLarge from "../../assets/gallon-one.png";
import gallonMedium from "../../assets/gallon-two.png";
import gallonSmall from "../../assets/gallon-three.png";

const SelectedColorCard = ({
  color_code,
  color_name,
  brand,
  yearRange,
  imageurl,
  onClick,
  variant,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 600);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isColorCode =
    /^#[0-9A-F]{6}$/i.test(imageurl) || /^rgb/i.test(imageurl);
  return (
    <div className=" w-ful px-8 sm:px-0 mt-3 sm:mt-5">
      <div className="flex gap-5  items-center mb-5 sm:px-8 ">
        <div className="flex items-center justify-center w-12 h-12  rounded-sm ">
          <TickIcon />
        </div>
        <h2 className="text-lg sm:text-[22px] font-bold ">
          Your Selected Color:
        </h2>
      </div>
      <div className="sm:flex sm:justify-between  sm:px-[5%] sm:gap-10">
        <div className="sm:w-1/2">
          <div className="flex flex-col w-full p-3 border rounded-xl border-[#0D1120] cursor-pointer transition-transform">
            <figure
              style={{
                background: isColorCode ? imageurl : imageurl,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="card-figure h-28 w-full rounded-xl"
              onClick={onClick}
            />

            <div className="flex items-center gap-2 p-4 pb-2">
              <div className="flex items-center justify-center w-6 h-6 min-w-[26px] rounded-sm bg-primary">
                <Check />
              </div>
              <h2 className="text-sm font-semibold">
                {`${color_code} / ${color_name}`}
              </h2>
            </div>
          </div>
          <div className="pt-4">
            <button
              className="btn rounded-full bg-[#0d1120] text-white py-2 font-normal capitalize border border-black hover:bg-white hover:text-[#1cbcba] hover:border-[#1cbcba] text-sm md:text-base w-full"
              onClick={onClick}
            >
              Shop Now
            </button>
          </div>
        </div>
        {isSmallScreen && (
          <div className="invisible sm:visible  sm:w-1/2 sm:border sm:rounded-xl sm:p-4">
            <div className="sm:flex-row sm:text-center">
              <h2 className="text-[#000] font-bold">Available Sizes:</h2>
              <span className="text-[12px]">
                4oz | Aerosols | Pints | Quarts | Gallons
              </span>
            </div>
            <div className="w-0 sm:w-auto">
              <div className="flex sm:items-baseline sm:justify-center">
                {/* Gallon */}
                <div className="flex flex-col items-center">
                  <img
                    src={gallonLarge}
                    alt="Gallon"
                    className="h-[150px] w-full object-contain"
                  />
                  <span className="text-sm font-bold">Gallon</span>
                </div>
                {/* Quart */}
                <div className="flex flex-col items-center">
                  <img
                    src={gallonMedium}
                    alt="Quart"
                    className="h-[120px] w-full object-contain"
                  />
                  <span className="text-sm font-bold">Quart</span>
                </div>
                {/* Pint */}
                <div className="flex flex-col items-center">
                  <img
                    src={gallonSmall}
                    alt="Pint"
                    className="h-20 w-full object-contain"
                  />
                  <span className="text-sm font-bold">Pint</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedColorCard;
