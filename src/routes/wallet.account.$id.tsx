import { WalletAccountHistory } from "~/widgets/WalletAccoutHistory";
import { Box, Button, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material";
import { useWalletAccount } from "~/hooks/useWalletAccount";
import { useParams } from "react-router";
import WalletTransactionForm from "~/widgets/WalletTransactionForm";
import { useState } from "react";
import type { Route } from "./+types/wallet.account.$id";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Аккаунт" },
    { name: "description", content: "Движение средств по аккаунту" },
  ];
}

export default function WalletAccountPage() {
  const params = useParams<{ id: string }>();
  const accountId = Number(params.id);
  const [showForm, setShowForm] = useState(false);

  if (!params.id || isNaN(accountId)) {
    return <Typography>Неверный ID аккаунта</Typography>;
  }
  const { data, isLoading, isFetching, isPending, isError, error } = useWalletAccount(accountId);

  if (isLoading) return <CircularProgress size={24} />;
  if (isError) return <Typography color="error">Ошибка при загрузке данных: {error.message}</Typography>;
  if (isPending) return <Typography>Нет данных</Typography>;

  const { account, entries } = data;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* 🔹 Затемнение при обновлении */}
      {isFetching && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(2px)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
          }}
        >
          <CircularProgress size={32} color="inherit" />
        </Box>
      )}
      {/* 🔹 Карточка аккаунта */}
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
            {account.balance.toLocaleString("ru-RU")} ₽
          </Typography>
          {account.description && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {account.description}
            </Typography>
          )}
        </CardContent>
      </Card>

      {showForm ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Новая транзакция
            </Typography>
            <WalletTransactionForm
              accountId={account.id}
              onCreated={() => {
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Добавить транзакцию
          </Button>
        </Box>
      )}
      <Typography variant="h6">История операций</Typography>
      <Box sx={{ height: 600, width: "100%" }}>
        <WalletAccountHistory entries={entries} />
      </Box>
    </Box>
  );
}