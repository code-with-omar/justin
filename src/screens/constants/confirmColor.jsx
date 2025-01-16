import SelectedColorCard from "./selectedColor";
import { Check } from "../../../src/components/common/svgs/index";
import gallonLarge from "../../assets/gallon-one.png";
import gallonMedium from "../../assets/gallon-two.png";
import gallonSmall from "../../assets/gallon-three.png";
import SelectedColorCardOutUnderCoat from "./selectedColorCardOutUnderCoat";

export default function ConfirmColor({
  selectedColor,
  onRecipeClick,
  getColorImage,
  setRemove,
  recipeData,
  getUndercoatImg,
}) {
  function extractUrl(urlString) {
    if (!urlString) {
      // Fallback to a default "no image" URL
      return "https://storage.googleapis.com/luna-colors/lib/no-image-xs.png";
    }

    // Remove url() if it exists
    const cleanedUrl = urlString.replace(/url\(["']?|["']?\)/g, "");

    // Validate the URL format (basic check)
    try {
      new URL(cleanedUrl); // If valid, return it
      return cleanedUrl;
    } catch {
      return "https://storage.googleapis.com/luna-colors/lib/no-image-xs.png"; // Fallback
    }
  }

  const UndercoatInfo = (
    <div className="w-full overflow-y-auto h-screen pt-5 px-10 sm:px-0">
      <div className=" flex flex-col sm:flex-row items-center justify-between bg-[#F7F7F7] sm:py-6">
        {/* Undercoat Card */}
        <div className=" space-y-3 card min-w-[300px] mt-4 sm:mt-0">
          <h3 className="text-lg font-bold text-[#000]leading-6 text-center mb-2">
            Required Undercoat:
          </h3>
          <div className="px-10 ">
            <div
              className="w-full rounded-xl border-[0.5px] border-[#0D1120] shadow-md p-4 cursor-pointer"
              onClick={onRecipeClick}
            >
              <img
                src={extractUrl(getUndercoatImg(recipeData))}
                alt={recipeData?.undercoat}
                className="card-figure h-20 w-full rounded-xl"
              />
              <div className="flex mt-2 gap-2 ">
                <div className="flex items-center justify-center w-6 h-6 min-w-[26px] rounded-sm bg-primary">
                  <Check />
                </div>
                <p className=" font-semibold text-sm sm:text-base">
                  {recipeData?.undercoat}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="divider divider-vertical sm:invisible  divider-secondary px-10 sm:px-0"
          style={{ borderColor: "#E7E7E7" }}
        ></div> */}
        {/* Undercoat Description */}
        <div className="px-[10%] my-[10%] sm:my-0 sm:px-4 space-y-3 sm:mb-0 ">
          <p className="text-sm font-normal text-gray-600 ">
            *This color requires an ‘Undercoat color’. Once you have confirmed
            your color you can then select the undercoat before adding to cart.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-y-auto h-screen">
      {!recipeData?.undercoat ? (
        <div>
          <SelectedColorCardOutUnderCoat
            onClick={onRecipeClick}
            imageurl={getColorImage(selectedColor)}
            color_code={selectedColor.code || ""}
            color_name={selectedColor.name || ""}
            year_range={selectedColor.year || ""}
            brand={selectedColor.fullBrand || ""}
          />
        </div>
      ) : (
        <div>
          <div>
            <SelectedColorCard
              onClick={onRecipeClick}
              imageurl={getColorImage(selectedColor)}
              color_code={selectedColor.code || ""}
              color_name={selectedColor.name || ""}
              year_range={selectedColor.year || ""}
              brand={selectedColor.fullBrand || ""}
            />
          </div>
          {recipeData.tricoat ? UndercoatInfo : <></>}
        </div>
      )}
    </div>
  );
}
