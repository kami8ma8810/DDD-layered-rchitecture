import React from 'react';
import { useTutorial } from '../contexts/TutorialContext';
import { TUTORIAL_STEPS } from '../constants/tutorialSteps';

export const TutorialModal: React.FC = () => {
  const { isActive, currentStep, nextStep, deactivateMode } = useTutorial();
  const step = TUTORIAL_STEPS[currentStep];

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl relative">
        <button
          onClick={deactivateMode}
          className="absolute top-4 right-4 btn btn-ghost btn-circle"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
            />
          </div>

          <h2 className="text-2xl font-bold text-blue-700 mb-4">{step.title}</h2>
          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-gray-600 whitespace-pre-line">{step.description}</p>
          </div>
          
          {step.code && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
                <span>TypeScript</span>
                <span className="text-xs">DDDの実装例</span>
              </div>
              <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
                {step.code}
              </pre>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="space-x-2">
              {TUTORIAL_STEPS.map((_, index) => (
                <span
                  key={index}
                  className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="space-x-4">
              <button
                onClick={deactivateMode}
                className="btn btn-ghost"
              >
                スキップ
              </button>
              {currentStep < TUTORIAL_STEPS.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  次へ
                </button>
              ) : (
                <button
                  onClick={deactivateMode}
                  className="btn btn-success"
                >
                  始めてみる
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 