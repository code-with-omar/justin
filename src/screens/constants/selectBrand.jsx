import { useModal } from "../../contexts/Modal";
import React, { useEffect, useState } from "react";
import { useBrands } from "./useSteps";

export default function SelectBrand() {
  const {
    setStepsValue,
    setIsLoading,
    setAdvanceStep,
    advanceStep,
    setAdvanceCard,
  } = useModal();
  const { data: brandsData, isFetching: brandsFetching } = useBrands();

  const [searchTerm, setSearchTerm] = useState("");
  const handleBrand = (brand) => {
    console.log(advanceStep);
    setAdvanceCard(2);
    setAdvanceStep(2);
    setStepsValue((prevState) => ({
      ...prevState,
      brand: brand,
    }));
  };
  useEffect(() => {
    if (brandsFetching) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [brandsFetching]);
  const filteredBrands = brandsData?.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className=" p-5 overflow-y-auto xl:my-10 h-[72vh] md:h-[80vh] mt-2 sm:mt-5 bg-background">
      <div className="grid gap-6 grid-cols-1 overflow-y-auto px-4">
        <input
          type="text"
          placeholder="Quick Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full bg-[#e5e7eb]"
        />
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  px-4 mt-2">
        {filteredBrands?.map((brand, index) => (
          <div
            key={index}
            className="py-7 px-11 flex items-center justify-center cursor-pointer bg-white border border-secondary rounded-xl"
            onClick={() => handleBrand(brand)}
          >
            <img
              src={brand.image}
              className="w-[80px] h-[80px]"
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
