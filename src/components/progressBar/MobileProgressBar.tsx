import { useEffect, useState } from "react";
import type { InnerProgressBarProps } from ".";

const ANIMATION_DURATION_MS = 300; // Matches duration-300
const WRAP_DELAY_MS = ANIMATION_DURATION_MS + 150; // Delay wrap until animation is done

export default ({ steps, currentStep, hideCount }: InnerProgressBarProps) => {
  // Signals for tracking direction
  const [prevStep, setPrevStep] = useState(currentStep);
  const [_isForward, setIsForward] = useState(true);

  // NEW: Signal to control the text wrapping state
  const [allowWrap, setAllowWrap] = useState(false);

  useEffect(() => {
    setIsForward(currentStep >= prevStep);
    setPrevStep(currentStep);

    // 1. Instantly disable wrapping when the step changes
    setAllowWrap(false);

    // 2. Schedule re-enabling wrapping after the animation is complete
    const timeoutId = setTimeout(() => {
      // Only allow wrapping if the current step is the one being viewed (open)
      setAllowWrap(true);
    }, WRAP_DELAY_MS);

    // Clean up the timeout when the task reruns or the component unmounts
    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  /**
   * Controls the slide animation for the step name container (title).
   */
  const getTitleAnimationClass = (index: number) => {
    if (index === currentStep) {
      return "w-auto max-w-full opacity-100 transition-all duration-300 ease-in-out";
    }
    return "w-0 max-w-0 opacity-0 transition-all duration-300 ease-in-out";
  };

  /**
   * Controls the overall width of the <li> step container itself.
   */
  const getLiClass = (index: number) => {
    let classes = "flex transition-all duration-500 ease-in-out";

    if (index === currentStep) {
      classes += " w-full md:w-3/4";
    } else {
      classes += " w-20 sm:w-24";
    }

    return classes;
  };

  // Function to apply/remove the wrapping behavior
  const getWrapClass = (index: number) => {
    // Apply no-wrap behavior during the transition OR for any step that is NOT the current one
    if (index !== currentStep || !allowWrap) {
      return "whitespace-nowrap";
    }
    // Once the transition is done AND it's the current step, allow wrapping
    return ""; // Allow default wrapping behavior
  };

  return (
    <nav aria-label="Progress" className="w-full">
      <ol
        role="list"
        className="flex grow divide-y-0 divide-gray-300 rounded-md border border-gray-300"
      >
        {steps
          .filter((step) => !step.hide)
          .map((step, index) => (
            <li key={step.label + index} className={getLiClass(index)}>
              <div className="group flex w-full items-center overflow-hidden">
                <span
                  className={[
                    "flex items-center p-2 px-3 text-sm font-medium",
                    getWrapClass(index),
                  ].join("")}
                >
                  {index < currentStep ? (
                    <span className="bg-secondary flex size-10 shrink-0 items-center justify-center rounded-full">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        className="size-6 text-white"
                      >
                        <path
                          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 ${index === currentStep ? "border-secondary" : "border-gray-300"}`}
                    >
                      <span
                        className={
                          index === currentStep
                            ? "text-secondary"
                            : "text-gray-300"
                        }
                      >
                        0{index + 1}
                      </span>
                    </span>
                  )}

                  <span
                    className={[
                      "ml-4 overflow-hidden text-sm font-medium",
                      index === currentStep
                        ? "text-secondary"
                        : index < currentStep
                          ? "text-gray-900"
                          : "text-gray-500",
                      getTitleAnimationClass(index),
                    ].join("")}
                  >
                    {step.label}
                  </span>
                </span>
              </div>

              {index !== steps.length - hideCount - 1 && (
                <div
                  aria-hidden="true"
                  className="top-0 right-0 block h-full w-5 shrink-0"
                >
                  <svg
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                    className="size-full text-gray-300"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentcolor"
                      vector-effect="non-scaling-stroke"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
};
