import React from "react";
import { CloseIcon } from "../../common/svgs/index";
export default function TipsDrower() {
  return (
    <>
      <div className="p-10 text-[#ffffff] flex flex-col justify-center items-center">
        <p className="text-base font-extrabold mb-5">
          Tips for Searching OEM Automotive Paint on The Spray Source...
        </p>

        <p className="mt-2 text-sm md:text-base">
          <span className="font-bold">Use Color Codes:</span> The quickest and
          most accurate way to find a color is by using its code (e.g., LY7C for
          Nardo Gray).
        </p>
        <p className="mt-2 text-sm md:text-base">
          <span className="font-bold">Don't know the code?:</span> o worries!
          Google can help. If you're stuck, our system will offer the option to
          run a Google search for you.
        </p>
        <p className="mt-2  text-sm md:text-base">
          <span className="font-bold">Search by Name:</span> You can also search
          by color name, but keep in mind that the name listed on a
          manufacturer’s website may not always match the official paint name.
          For example, Miami Blue is actually Miamiblau (Code: M5C).
        </p>
        <p className="mt-2  text-sm md:text-base">
          <span className="font-bold">Incorrect name?:</span> If you enter a
          color name that’s incorrect, we'll prompt you to let us run a Google
          search to help you find the right color code.
        </p>
      </div>
    </>
  );
}
