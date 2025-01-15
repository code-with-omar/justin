import React from "react";

export default function ErrorDrower() {
  return (
    <div className="flex flex-col h-full text-center pt-10 p-8 items-center">
      <h3 className="text-[14px] md:text-[18px] text-center text-white font-black uppercase font-heading">
        It looks like we don’t have this color updated in our app…
      </h3>
      <p className="mt-8 text-white">
        Fill out our quick form so that we can have this updated and contact you
        when it’s ready 🙂
      </p>
      {/* Replace this button with DaisyUI components if required */}
      <div
        onClick={() =>
          window.open(
            "https://thespraysource.com/pages/oematch-inquiry",
            "_blank",
            "noopener,noreferrer"
          )
        }
        className="flex text-white w-fit items-center border border-gray-300 rounded p-2 text-[14px] mt-6 hover:bg-primary cursor-pointer"
      >
        <div className="h-5 w-5 mr-4 md:w-6 md:h-6 text-white" />
        Open Form
      </div>
    </div>
  );
}
