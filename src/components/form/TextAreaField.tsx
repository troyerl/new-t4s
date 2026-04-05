import { XMark } from "../../icons";
import ErrorMessage from "./ErrorMessage";

interface TextAreaFieldProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  inputProps?: any;
  rows?: number;
  className?: string;
  clearable?: boolean;
}

export const TextAreaField = ({
  id,
  label,
  value,
  onChange,
  inputProps,
  rows = 4,
  className,
  clearable = true,
}: TextAreaFieldProps) => {
  return (
    <div className="relative flex w-full items-center">
      <textarea
        id={id}
        placeholder=" "
        rows={rows}
        value={value}
        className={`peer focus:border-primary w-full rounded-md border border-gray-300 py-3 pr-10 pl-4 hover:border-gray-400 focus:outline-none ${className}`}
        onInput$={(event: InputEvent) =>
          onChange?.(
            event.target ? (event.target as HTMLInputElement).value : "",
          )
        }
        {...inputProps}
      />
      <label
        htmlFor={id}
        // className={`peer-focus:text-primary duration-300 absolute ${value ? "top-0 left-3 text-xs" : "top-1/2 left-4 text-base"} -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-xs`}
        className="absolute text-gray-500 duration-300 transform -translate-y-5 scale-75 top-2 left-3 z-10 origin-left bg-white px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-12 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:left-3 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        {label}
      </label>
      <div
        className={`absolute top-2 right-2 hidden items-center ${clearable ? "peer-[:not(:placeholder-shown):focus] peer-[:not(:placeholder-shown)]:flex" : ""}`}
      >
        <button
          type="button"
          className="ml-2 rounded-full p-1 hover:cursor-pointer hover:bg-gray-100"
          id={"clear-" + inputProps?.name}
          onClick={() => {
            const input = document.getElementById(id) as HTMLInputElement;
            if (input) {
              input.value = ""; // set empty value
              const event = new Event("input", { bubbles: true });
              input.dispatchEvent(event); // manually trigger input event
            }
          }}
        >
          <XMark />
        </button>
      </div>
    </div>
  );
};

interface FormTextAreaFieldProps extends TextAreaFieldProps {
  error?: string;
  errorClass?: string;
}

export const FormTextAreaField = ({
  error,
  errorClass,
  ...inputProps
}: FormTextAreaFieldProps) => {
  return (
    <>
      <TextAreaField
        {...inputProps}
        className={error ? "border-red-600" : undefined}
      />
      {error && (
        <div className={`${errorClass} pt-2`}>
          <ErrorMessage error={error} />
        </div>
      )}
    </>
  );
};
