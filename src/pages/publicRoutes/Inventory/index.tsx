import useGetInventory from "../../../api/hooks/useGetInventory";
import Card from "../../../components/card";
import Table from "../../../components/table";
import type { IInventoryDisplay } from "../../../interface/Inventory";

const columns = [
  {
    name: "Item Name",
    key: "name",
    sortable: true,
    width: 200,
  },
  {
    name: "In Stock",
    key: "amount",
    sortable: true,
  },
  {
    name: "Limit",
    key: "limit",
    sortable: true,
  },
  {
    name: "Location(s)",
    key: "locationKeys[0]",
    sortable: true,
  },
  {
    name: "Description",
    key: "description",
    sortable: false,
  },
];

interface MobileInventoryRowProps {
  row: IInventoryDisplay;
}

const MobileInventoryRow = ({ row }: MobileInventoryRowProps) => {
  return (
    <div className="p-4">
      <p className="text-xs">Limit: {row.limit}</p>
      <h3 className="text-lg font-semibold">{row.name}</h3>
      <p className="text-sm">In Stock: {row.amount}</p>
      <p className="text-sm">Location(s): {row.locationKeys.join(", ")}</p>
    </div>
  );
};

const LoadingContent = () => (
  <div className="h-150 w-full animate-pulse rounded-lg bg-gray-100"></div>
);

const InventoryPage = () => {
  const { data = [], isLoading } = useGetInventory(true);

  if (isLoading) {
    return <LoadingContent />;
  }

  return (
    <div className="animate-slide-in-from-bottom flex w-full flex-wrap">
      <Card cardClass="shadow-lg border-gray-100 p-4 lg:p-0">
        <Table
          columns={columns}
          rows={data}
          tableLabel="Current Inventory Data"
          MobileInventoryRow={MobileInventoryRow}
          searchable
        />
      </Card>
    </div>
  );
};

export default InventoryPage;
