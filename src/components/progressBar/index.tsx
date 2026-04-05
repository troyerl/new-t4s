import MobileProgressBar from "./MobileProgressBar";
import DesktopProgressBar from "./DesktopProgressBar";

interface Step {
  label: string;
  hide?: boolean;
}

export interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export interface InnerProgressBarProps extends ProgressBarProps {
  hideCount: number;
}

export default (props: ProgressBarProps) => {
  const hideCount = props.steps.filter((step) => step.hide).length;
  return (
    <>
      <div className="flex w-full md:hidden">
        <MobileProgressBar {...props} hideCount={hideCount} />
      </div>
      <div className="hidden w-full md:flex">
        <DesktopProgressBar {...props} hideCount={hideCount} />
      </div>
    </>
  );
};
