import { Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { WalletAccountEntry } from "~/services/walletService";


const entryColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "amount",
    headerName: "Сумма",
    flex: 1.5,
    minWidth: 100,
    renderCell: (params) => (
      <Typography
        color={params.value < 0 ? "error.main" : "success.main"}
        fontWeight="bold"
        variant="body2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          height: '100%',
          lineHeight: 'normal'
        }}
      >
        {params.value.toLocaleString('ru-RU')} ₽
      </Typography>
    ),
  },
  {
    field: "description",
    headerName: "Описание",
    minWidth: 150,
    flex: 5,
    renderCell: (params) => (
      <Typography
        variant="body2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          lineHeight: 'normal'
        }}
      >
        {params.value || "-"}
      </Typography>
    ),
  },
  {
    field: "operationAt",
    headerName: "Дата операции",
    minWidth: 150,
    flex: 2,
    valueFormatter: (params: any) => {
      if (!params) return "-";
      return new Date(params).toLocaleString('ru-RU');
    },
  },
  {
    field: "createdAt",
    headerName: "Дата создания",
    minWidth: 150,
    flex: 2,
    valueFormatter: (params: any) => {
      if (!params) return "-";
      return new Date(params).toLocaleString('ru-RU');
    },
  },
  {
    field: "transactionId",
    headerName: "ID транзакции",
    width: 120,
    flex: 1.5,
    align: "center",
    headerAlign: "center",
  },
];

export function WalletAccountHistory({ entries }: { entries: WalletAccountEntry[] }) {
  const tableRows = entries.map(entry => ({
    id: entry.id,
    amount: entry.amount,
    description: entry.operation?.description || "",
    operationAt: entry.operation?.operation_at || "",
    createdAt: entry.operation?.created_at || "",
    transactionId: entry.operation?.id || 0
  }));

  return (
    <DataGrid
      rows={tableRows}
      columns={entryColumns}
      getRowId={(row) => row.id}
      pageSizeOptions={[25, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 25 },
        },
      }}
    />
  );
}