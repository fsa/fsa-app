import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { api } from "~/services/api";

interface Account {
  id: number;
  name: string;
  balance: number;
  description: string;
}

interface Entry {
  id: number;
  amount: number;
  operation: {
    id: number;
    name: string;
    description: string;
    operation_at: string;
    created_at: string;
  };
}

interface AccountResponse {
  account: Account;
  entries: Entry[];
}

const entryColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "amount",
    headerName: "Сумма",
    flex: 1,
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
    flex: 1.5,
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
    flex: 1.2,
    valueFormatter: (params: any) => {
      if (!params) return "-";
      return new Date(params).toLocaleString('ru-RU');
    },
  },
  {
    field: "createdAt",
    headerName: "Дата создания",
    flex: 1.2,
    valueFormatter: (params: any) => {
      if (!params) return "-";
      return new Date(params).toLocaleString('ru-RU');
    },
  },
  {
    field: "transactionId",
    headerName: "ID транзакции",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
];

export default function WalletAccountPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<AccountResponse>(`/wallet/account/${id}`)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Ошибка при загрузке данных счёта: " + err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>Нет данных</Typography>;

  const { account, entries } = data;

  // Преобразуем данные для таблицы - извлекаем нужные поля из operation
  const tableRows = entries.map(entry => ({
    id: entry.id,
    amount: entry.amount,
    description: entry.operation?.description || "",
    operationAt: entry.operation?.operation_at || "",
    createdAt: entry.operation?.created_at || "",
    transactionId: entry.operation?.id || 0
  }));

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* 🔹 Карточка с информацией об аккаунте */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {account.name}
          </Typography>
          <Typography
            color={account.balance < 0 ? "error.main" : "success.main"}
            fontWeight="bold"
            variant="h6"
          >
            {account.balance.toLocaleString('ru-RU')} ₽
          </Typography>
          {account.description && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {account.description}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Таблица с движением средств */}
      <Typography variant="h6">История операций</Typography>
      <div style={{ height: 600, width: "100%" }}>
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
      </div>
    </Box>
  );
}