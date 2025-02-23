import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  activateMode: () => void;
  deactivateMode: () => void;
  nextStep: () => void;
  resetTutorial: () => void;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

interface TutorialProviderProps {
  children: ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const activateMode = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const deactivateMode = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const resetTutorial = () => {
    setCurrentStep(0);
  };

  return (
    <TutorialContext.Provider 
      value={{ 
        isActive, 
        currentStep, 
        activateMode, 
        deactivateMode, 
        nextStep, 
        resetTutorial,
        setCurrentStep 
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}; 