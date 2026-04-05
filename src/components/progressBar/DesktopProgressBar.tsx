import type { InnerProgressBarProps } from ".";

export default ({ steps, currentStep, hideCount }: InnerProgressBarProps) => {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol
        role="list"
        className="flex divide-y-0 divide-gray-300 rounded-md border border-gray-300"
      >
        {steps
          .filter((step) => !step.hide)
          .map((step, index) => (
            <li key={step.label + index} className="relative flex flex-1">
              <div className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
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
                      className={`${index === currentStep ? "border-secondary" : "border-gray-300"} flex size-10 shrink-0 items-center justify-center rounded-full border-2`}
                    >
                      <span
                        className={
                          index === currentStep
                            ? "text-secondary"
                            : "text-gray-500"
                        }
                      >
                        0{index + 1}
                      </span>
                    </span>
                  )}
                  <span
                    className={`${index < currentStep ? "text-gray-900" : index === currentStep ? "text-secondary" : "text-gray-500"} ml-4 text-sm font-medium`}
                  >
                    {step.label}
                  </span>
                </span>
              </div>
              {index !== steps.length - hideCount - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 block h-full w-5"
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
