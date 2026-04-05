import SuccessImg from "../../../../../assets/img/success.png";

export default () => {
  return (
    <div className="">
      <img src={SuccessImg} className="mx-auto h-37.5 w-37.5" />
      <div className="flex w-full flex-col items-center justify-center gap-2 px-5 py-10">
        <h3 className="text-center text-2xl font-semibold">
          Your reservation has been confirmed!
        </h3>
        <h4 className="text-center text-lg font-light">
          You will receive an email confirmation shortly.
        </h4>
      </div>
    </div>
  );
};
