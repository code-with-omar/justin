import { useState, createContext, useContext } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("1");

  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stepsValue, setStepsValue] = useState({ brand: null, modelId: null });
  const [resultCard, setResultCard] = useState("1");
  const [searchStep, setSearchStep] = useState("1");
  const [initialAdvance, setInitialAdvance] = useState(false);
  const [advanceStep, setAdvanceStep] = useState("1");
  const [isSearching, setIsSearching] = useState(false);
  const [advanceBack, setAdvanceBack] = useState("1");
  const [tipsIsOpen, setIsTipsOpen] = useState(false);
  // Tailwind utility for detecting screen size (use built-in classes for responsiveness)

  function openModal() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
  }
  function closeModal() {
    setStep("1");
    setIsLoading(false);
    setIsOpen(false);
    setIsSidebarCollapsed(false);
    setInitialAdvance(false);
    setIsSearching(false);
    setAdvanceStep("1");
    setResultCard("1");
    setStepsValue({ brand: null, modelId: null });
    setSearchStep("1");
    setAdvanceBack("1");

    // Allow body scroll after modal closes
    setTimeout(() => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "initial";
    }, 0);
  }
  const tipsCloseModal = () => {
    setIsTipsOpen(false);
  };
  const value = {
    stepsValue,
    isOpen,
    step,
    isLoading,
    isSidebarCollapsed,
    setIsLoading,
    setStep,
    setIsOpen,
    openModal,
    closeModal,
    setStepsValue,
    setIsSidebarCollapsed,
    resultCard,
    setResultCard,
    searchStep,
    setSearchStep,
    initialAdvance,
    setInitialAdvance,
    advanceStep,
    setAdvanceStep,
    isSearching,
    setIsSearching,
    advanceBack,
    setAdvanceBack,
    tipsIsOpen,
    setIsTipsOpen,
    tipsCloseModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
