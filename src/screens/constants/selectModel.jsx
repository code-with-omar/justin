import { useEffect, useState } from "react";
import { useModal } from "../../contexts/Modal";
import { useModels } from "./useSteps";

export default function SelectModel() {
  const {
    setStep,
    stepsValue,
    setStepsValue,
    setIsLoading,
    advanceStep,
    setAdvanceStep,
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
    setAdvanceStep("3");
    setStepsValue((prevState) => ({
      ...prevState,
      modelId: selectedModalId,
    }));
  };
  const filterdModels = modelsData?.filter((model) =>
    model.type.toLowerCase().includes(searchTerms.toLowerCase())
  );
  return (
    <div className="p-4 xl:p-10 xl:flex xl:flex-col xl:w-full">
      <div className="grid gap-6 grid-cols-1 md:overflow-y-auto xl:my-10 max-h-[60vh] px-4 scrollbar">
        <input
          type="text"
          onChange={(e) => setSearchTerms(e.target.value)}
          value={searchTerms}
        />
      </div>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:overflow-y-auto xl:my-10 max-h-[60vh] px-4 scrollbar">
        {filterdModels?.map((model, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer border border-secondary bg-white rounded-xl space-y-3"
            onClick={() => handleModal(model.id)}
          >
            {/* <div className="flex justify-center">
              <img src={model.image} className="object-contain rounded-xl" alt={model.id} />
            </div> */}
            <div className="px-1 pb-1 space-y-3">
              <p className="xl:text-lg font-semibold">{model.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
