import type { ReactNode } from "react";

interface CardProps {
  cardClass?: string;
  contentClass?: string;
  children: ReactNode;
}
export default ({ cardClass, contentClass, children }: CardProps) => {
  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg ${cardClass || ""}`}
    >
      <div className={`px-2 py-6 ${contentClass || ""}`}>{children}</div>
    </div>
  );
};
