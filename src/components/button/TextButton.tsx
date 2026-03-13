// import { component$, QRL, Slot } from "@builder.io/qwik";
// import { LoadingCircle } from "../icons/LoadingCircle";

// interface ITextButtonProps {
// onClick$?: QRL;
// class?: string;
// type?: "submit" | "reset" | "button";
// isLoading?: boolean;
// id?: string;
// name?: string;
// disabled?: boolean;
// }

// export default component$<ITextButtonProps>(
//   ({ onClick$, class: className, isLoading, disabled, ...props }) => {
//     return (
//       <button
//         {...props}
//         disabled={isLoading || disabled}
// class={[
//   "text-primary relative flex cursor-pointer items-center overflow-hidden rounded-lg px-4 py-4 font-semibold",
//   "hover:bg-gray-200",
//   "disabled:cursor-not-allowed disabled:text-gray-300 hover:disabled:bg-transparent",
//   className || "",
// ].join(" ")}
//         onClick$={(event: PointerEvent, e: HTMLButtonElement) => {
//           const btn = e as HTMLButtonElement;
//           const circle = document.createElement("span");
//           const diameter = Math.max(btn.clientWidth, btn.clientHeight);
//           const radius = diameter / 2;

//           circle.style.width = circle.style.height = `${diameter}px`;
//           circle.style.left = `${event.clientX - btn.offsetLeft - radius}px`;
//           circle.style.top = `${event.clientY - btn.offsetTop - radius}px`;
//           circle.className =
//             "absolute bg-gray-500 opacity-30 rounded-full pointer-events-none animate-ripple";

//           // Remove existing ripple if present
//           const existingRipple = btn.querySelector(".animate-ripple");
//           if (existingRipple) existingRipple.remove();

//           btn.appendChild(circle);

//           onClick$?.(event, e);

//           // Clean up after animation
//           setTimeout(() => circle.remove(), 600);
//         }}
//       >
//         <Slot />
//         {isLoading && <LoadingCircle />}
//       </button>
//     );
//   },
// );

import { useState, type ReactNode, type MouseEvent } from "react";
import { LoadingCircle } from "../../icons/LoadingCircle";

interface ITextButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  id?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

export default ({
  onClick,
  type,
  isLoading = false,
  id,
  className,
  disabled = false,
  children,
}: ITextButtonProps) => {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate size (diameter) to cover the whole button
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { id: Date.now(), x, y, size };
    setRipples((prev) => [...prev, newRipple]);

    // Clean up ripple after animation (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.(event);
  };

  return (
    <button
      onClick={createRipple}
      className={[
        "text-primary relative flex cursor-pointer items-center overflow-hidden rounded-lg px-4 py-4 font-semibold",
        "hover:bg-gray-200",
        "disabled:cursor-not-allowed disabled:text-gray-300 hover:disabled:bg-transparent",
        className || "",
      ].join(" ")}
      // className={`relative overflow-hidden rounded-lg px-5 py-3 text-md font-semibold text-white shadow-lg transition-all hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 ${
      //   color === "primary" ? "bg-primary" : "bg-secondary"
      // } ${className}`}
      type={type}
      disabled={isLoading || disabled}
      id={id}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {isLoading && <LoadingCircle />}
      </span>

      {/* Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-white/30 pointer-events-none"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};
