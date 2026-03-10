import { ChevronLeft, ChevronRight } from "../../../icons";

interface TablePaginationProps {
  totalRows: number;
  page: number;
  viewAmount: number;
  onIncrementPage: VoidFunction;
  onDecrementPage: VoidFunction;
  onViewAmountChange: (value: string) => void;
}
export default ({
  totalRows,
  page,
  viewAmount,
  onViewAmountChange,
  onIncrementPage,
  onDecrementPage,
}: TablePaginationProps) => {
  return (
    <div className="flex w-full flex-col flex-nowrap items-center justify-end gap-2 border-t border-gray-200 p-3 lg:flex-row lg:gap-8">
      <RowsPerPageOptions
        totalRows={totalRows}
        viewAmount={viewAmount.toString()}
        onChange={onViewAmountChange}
      />
      <ViewAmountInfo
        totalRows={totalRows}
        page={page}
        viewAmount={viewAmount}
        onIncrementPage={onIncrementPage}
        onDecrementPage={onDecrementPage}
      />
    </div>
  );
};

interface RowsPerPageOptionsProps {
  totalRows: number;
  viewAmount: string;
  onChange: (value: string) => void;
}

const RowsPerPageOptions = (
  {
    // totalRows,
    // viewAmount,
    // onChange,
  }: RowsPerPageOptionsProps,
) => (
  <div className="flex flex-nowrap items-center">
    <p className="text-sm font-normal">Rows per page:</p>
    {/* <div>
      <Select
        class="w-17"
        options={[
          {
            label: "10",
            value: "10",
          },
          {
            label: "30",
            value: "30",
          },
          {
            label: "All",
            value: totalRows.toString(),
          },
        ]}
        value={viewAmount}
        onChange={onChange}
        outline={false}
        disabled={totalRows < parseInt(viewAmount)}
      />
    </div> */}
  </div>
);

interface ViewAmountInfoProps {
  page: number;
  viewAmount: number;
  totalRows: number;
  onIncrementPage: VoidFunction;
  onDecrementPage: VoidFunction;
}

const ViewAmountInfo = ({
  page,
  viewAmount,
  totalRows,
  onIncrementPage,
  onDecrementPage,
}: ViewAmountInfoProps) => (
  <div className="flex flex-nowrap items-center gap-4">
    <p className="text-sm font-normal">
      {(page - 1) * viewAmount + 1}-
      {`${page * viewAmount > totalRows ? totalRows : page * viewAmount}`} of{" "}
      {totalRows}
    </p>
    <div className="flex flex-nowrap items-center gap-2">
      <button
        onClick={onDecrementPage}
        disabled={page === 1}
        className="cursor-pointer rounded-full px-2.5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Previous Page"
        data-testid="KeyboardArrowLeftIcon"
      >
        <ChevronLeft class="mr-0.5 size-5" />
      </button>
      <button
        onClick={onIncrementPage}
        disabled={page * viewAmount >= totalRows}
        className="cursor-pointer rounded-full px-2.5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Next Page"
        data-testid="KeyboardArrowRightIcon"
      >
        <ChevronRight class="ml-0.5 size-5" />
      </button>
    </div>
  </div>
);
