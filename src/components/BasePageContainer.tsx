interface IBaseScreenProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default ({ className, style, children }: IBaseScreenProps) => {
  return (
    <div
      className={[
        "flex w-full max-w-375 flex-wrap justify-center overflow-hidden px-3 py-14 lg:px-35 lg:max-w-478",
        className || "",
      ].join(" ")}
      style={style}
    >
      <div className="w-full lg:max-w-300">{children}</div>
    </div>
  );
};
