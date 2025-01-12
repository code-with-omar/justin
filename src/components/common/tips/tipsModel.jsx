import React from "react";

export const TipsModal = ({ showTipsModal, setTipDrawerOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${
        showTipsModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="relative bg-[#0d1120] text-white rounded-2xl p-8 w-11/12 md:w-2/3 max-w-2xl">
        <div className="flex items-center justify-between">
          <h2
            id="modal-title"
            className="text-lg font-extrabold uppercase text-white"
          >
            When you are searching for a colour, please follow these tips…
          </h2>
          <button
            type="button"
            className="btn btn-circle btn-sm text-white hover:bg-gray-600"
            onClick={() => setTipDrawerOpen(false)}
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              aria-hidden="true"
            >
              <path
                d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6l6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <p id="modal-description" className="text-base">
            Colour codes are the easiest way to find a colour. E.g LY7C (Nardo
            Grey)
          </p>
          <p className="text-base">
            If you don’t know the code then Google is your friend (the app will
            give you the option to search Google if you get stuck).
          </p>
          <p className="text-base">
            Search by name also works but the names you see listed on a
            Manufacturer website might not be the correct paint name.
          </p>
          <p className="text-base">
            E.g. Miami Blue is in fact Miamiblau or Colour Code M5C.
          </p>
          <p className="text-base">
            If you type in a colour name which is wrong, you’ll be prompted to
            let us run a Google search for you to help get you the colour code.
          </p>
        </div>
      </div>
    </div>
  );
};
