import { LuBookType } from "react-icons/lu";

export default function ErrorDrower({ isMobile }) {
  return (
    <>
      {isMobile && (
        <div className="p-10 text-[#ffffff] flex flex-col justify-center ">
          <h3 className="text-[14px] md:text-[18px]  text-center font-black uppercase font-heading">
            It looks like we don’t have this color updated in our app…
          </h3>
          <p className="mt-8 text-center">
            Fill out our quick form so that we can have this updated and contact
            you when it’s ready 🙂
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
            className="flex text-white  text-center border border-gray-300 rounded p-2 text-[14px] mt-6 hover:bg-primary cursor-pointer sm:w-1/4 m-auto"
          >
            <LuBookType className="h-5 w-5 mr-4 md:w-6 md:h-6 text-white" />
            Open Form
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="text-[#ffffff] flex  justify-center ">
          <div className="h-screen flex justify-center items-center pl-2">
            <div className=" mx-auto h-[100px] w-2 rounded-full bg-white "></div>
          </div>
          <div className="p-8 h-[95vh] flex flex-col justify-center">
            <div className="p-10 text-[#ffffff] flex flex-col justify-center ">
              <h3 className="text-[14px] md:text-[18px]  text-center font-black uppercase font-heading">
                It looks like we don’t have this color updated in our app…
              </h3>
              <p className="mt-8 text-center">
                Fill out our quick form so that we can have this updated and
                contact you when it’s ready 🙂
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
                className="flex text-white  text-center border border-gray-300 rounded p-2 text-[14px] mt-6 hover:bg-primary cursor-pointer m-auto"
              >
                <LuBookType className="h-5 w-5 mr-4 md:w-6 md:h-6 text-white" />
                Open Form
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
