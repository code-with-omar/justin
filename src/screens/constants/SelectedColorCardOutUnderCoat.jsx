import React, { useEffect, useState } from "react";
import { Check, TickIcon } from "../../../src/components/common/svgs/index";
import gallonLarge from "../../assets/gallon-one.png";
import gallonMedium from "../../assets/gallon-two.png";
import gallonSmall from "../../assets/gallon-three.png";

const SelectedColorCardOutUnderCoat = ({
  color_code,
  color_name,
  brand,
  yearRange,
  imageurl,
  onClick,
  variant,
}) => {
  const isColorCode =
    /^#[0-9A-F]{6}$/i.test(imageurl) || /^rgb/i.test(imageurl);
  return (
    <div className="w-full  flex flex-col  items-center ">
      {/* Header Section */}
      {/* <div className="flex gap-5 items-center mb-5"></div> */}
      <div className="justify-center">
        <div className="">
          {/* Color Selection Section */}
          <div className="flex justify-start items-center gap-5 my-4">
            <TickIcon className="flex items-center justify-center w-12 h-12 rounded-sm" />
            <h2 className="text-lg sm:text-[22px] font-bold">
              Your Selected Color:
            </h2>
          </div>

          {/* Color Card */}
          <div className="w-full p-3 border rounded-xl border-[#0D1120] cursor-pointer transition-transform">
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
              <h2 className="text-sm font-semibold">{`${color_code} / ${color_name}`}</h2>
            </div>
          </div>

          {/* Shop Button */}
          <div className="pt-4">
            <button
              className="btn rounded-full bg-[#0d1120] text-white py-2 font-normal capitalize border border-black hover:bg-white hover:text-[#1cbcba] hover:border-[#1cbcba] text-sm md:text-base w-full"
              onClick={onClick}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Available Sizes Section */}
      <div className="invisible sm:visible sm:w-1/2 sm:border sm:rounded-xl sm:p-4 mt-4 overflow-y-auto h-screen">
        <div className="sm:flex-row sm:text-center">
          <h2 className="text-[#000] font-bold">Available Sizes:</h2>
          <span className="text-[12px]">
            4oz | Aerosols | Pints | Quarts | Gallons
          </span>
        </div>
        <div className="w-0 sm:w-auto">
          <div className="flex sm:items-baseline sm:justify-center gap-4 mt-4">
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
    </div>
  );
};

export default SelectedColorCardOutUnderCoat;
