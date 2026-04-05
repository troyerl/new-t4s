import { useState } from "react";

interface ICodeInput {
  type?: "string" | "number" | "tel";
  size: number;
  onComplete: (code: string) => void;
  onChange?: (code: string) => void;
  className?: string;
  defaultValue?: string;
}

export default ({
  type = "number",
  size,
  onComplete,
  onChange,
  className,
  defaultValue = "",
}: ICodeInput) => {
  const [code, setCode] = useState<string>(defaultValue);

  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: size }).map((_, i) => (
        <input
          key={i}
          name={`code${i}`}
          type={type}
          placeholder="-"
          maxLength={1}
          value={code[i]}
          className={`focus:border-primary w-11.25 rounded-lg border border-gray-300 px-2 py-3 text-center focus:outline-none ${className}`}
          onInput={(event: any) => {
            const value = event.target.value;
            const str = code;

            if (i < 0) {
              return;
            }

            const codeValue = str.slice(0, i) + value + str.slice(i + 1);
            setCode(codeValue);

            onChange?.(codeValue);

            if (i >= size - 1) {
              onComplete(codeValue);
            }

            const nextfield = document.querySelector(
              `input[name=code${value ? i + 1 : i - 1}]`,
            );

            if (nextfield !== null) {
              (nextfield as HTMLElement).focus();
            }
          }}
        />
      ))}
    </div>
  );
};
