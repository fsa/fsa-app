import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import WalletAccountList from "@/widgets/WalletAccountList";
import WalletAccountForm from "@/widgets/WalletAccountForm";
import type { Route } from "./+types/wallet";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Кошелёк" },
    { name: "description", content: "Список счетов" },
  ];
}

export default function WalletPage() {
  const [reloadKey, setReloadKey] = useState(Date.now());
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <Card>
          <CardHeader title="Создание нового счёта" />
          <CardContent>
            <WalletAccountForm
              onCreated={() => {
                setReloadKey(Date.now());
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Счета" />
            <CardContent>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                  variant="contained"
                  onClick={() => setShowForm(true)}
                >
                  Создать новый счёт
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
      <WalletAccountList reloadKey={reloadKey} />
    </>
  );
}
