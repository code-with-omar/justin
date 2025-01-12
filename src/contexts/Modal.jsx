import { useState, createContext, useContext } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("1");
  const [hasSearchValue, setHasSearchValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stepsValue, setStepsValue] = useState({ brand: null, modelId: null });
  const [resultCard, setResultCard] = useState("1");
  const [searchStep, setSearchStep] = useState("1");
  const [initialAdvance, setInitialAdvance] = useState(false);
  const [advanceStep, setAdvanceStep] = useState("1");
  // Tailwind utility for detecting screen size (use built-in classes for responsiveness)
  const isDesktop = window.innerWidth >= 768;

  function openModal() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
  }

  function closeModal() {
    setStep("1");
    setHasSearchValue(false);
    setIsLoading(false);
    setIsOpen(false);
    setIsSidebarCollapsed(false);
    setInitialAdvance(false);

    setAdvanceStep("1");
    setTimeout(() => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "initial";
    });
  }

  const value = {
    stepsValue,
    isOpen,
    isDesktop,
    step,
    isLoading,
    hasSearchValue,
    isSidebarCollapsed,
    setIsLoading,
    setStep,
    setIsOpen,
    openModal,
    closeModal,
    setHasSearchValue,
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
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
