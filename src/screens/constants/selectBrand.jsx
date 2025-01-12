import { useModal } from "../../contexts/Modal";
import React, { useEffect, useState } from "react";
import { useBrands } from "./useSteps";

export default function SelectBrand() {
  const { setStepsValue, setIsLoading, setAdvanceStep, advanceStep } =
    useModal();
  const { data: brandsData, isFetching: brandsFetching } = useBrands();

  const [searchTerm, setSearchTerm] = useState("");
  const handleBrand = (brand) => {
    console.log(advanceStep);
    setAdvanceStep("2");
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
    <div className="h-full py-2">
      <div className="grid gap-6 grid-cols-1 md:overflow-y-auto xl:my-10 max-h-[60vh] px-4 scrollbar">
        <input
          type="text"
          placeholder="Quick Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4 xl:grid-cols-4 md:overflow-y-auto xl:my-10 max-h-[60vh] px-4 scrollbar">
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
