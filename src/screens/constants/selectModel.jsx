import { useEffect, useState } from "react";
import { useModal } from "../../contexts/Modal";
import { useModels } from "./useSteps";

export default function SelectModel() {
  const {
    stepsValue,
    setStepsValue,
    setIsLoading,

    setAdvanceStep,
    setAdvanceCard,
    isMobile,
  } = useModal();
  const { data: modelsData, isLoading: isModelsLoading } =
    useModels(stepsValue);
  const [searchTerms, setSearchTerms] = useState("");
  useEffect(() => {
    if (isModelsLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isModelsLoading]);
  const handleModal = (selectedModalId) => {
    setAdvanceStep(3);
    setAdvanceCard("3");
    setStepsValue((prevState) => ({
      ...prevState,
      modelId: selectedModalId,
    }));
  };
  const filterdModels = modelsData?.filter((model) =>
    model.type.toLowerCase().includes(searchTerms.toLowerCase())
  );
  return (
    <div
      className={`p-5 overflow-y-auto xl:my-10 h-[55vh] sm:h-[65vh] ${
        !isMobile ? "h-[55vh]" : "sm:h-[75vh]"
      } mt-2 sm:mt-5 bg-background`}
    >
      <div className="grid gap-6 grid-cols-1 overflow-y-auto xl:my-10 max-h-[65vh]  scrollbar">
        <input
          type="text"
          placeholder="Quick Search"
          onChange={(e) => setSearchTerms(e.target.value)}
          value={searchTerms}
          className="input input-bordered w-full bg-[#e5e7eb]"
        />
      </div>

      <div className="grid gap-6 grid-cols-2 mt-2 sm:mt-4 md:grid-cols-3 xl:grid-cols-4 ">
        {filterdModels?.map((model, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer border border-secondary bg-white rounded-xl flex items-center"
            onClick={() => handleModal(model.id)}
          >
            {/* <div className="flex justify-center">
              <img src={model.image} className="object-contain rounded-xl" alt={model.id} />
            </div> */}
            <div className="px-1 pb-1 ">
              <p className="text-sm xl:text-lg font-semibold">{model.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
