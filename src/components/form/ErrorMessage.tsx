interface ErrorMessageProps {
  error: string;
  className?: string;
}

export default ({ error, className = "" }: ErrorMessageProps) => (
  <div className={`-mt-4 text-xs text-red-600 ${className}`}>{error}</div>
);
