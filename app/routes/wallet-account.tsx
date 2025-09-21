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
      >
        {params.value.toLocaleString()} ₽
      </Typography>
    ),
  }
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
            {account.balance.toLocaleString()} ₽
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
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={entries}
          columns={entryColumns}
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
}
