import { useState, type ReactNode, type MouseEvent } from "react";
import { LoadingCircle } from "../../icons/LoadingCircle";

interface BaseButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  id?: string;
  class?: string;
  disabled?: boolean;
  color?: "primary" | "secondary";
  children: ReactNode;
}

export default ({
  onClick,
  type,
  isLoading = false,
  id,
  class: className,
  disabled = false,
  color = "primary",
  children,
}: BaseButtonProps) => {
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
      className={`relative overflow-hidden rounded-lg px-5 py-3 text-md font-semibold text-white shadow-lg transition-all hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50 ${
        color === "primary" ? "bg-primary" : "bg-secondary"
      } ${className}`}
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
