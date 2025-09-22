import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "~/services/api";

interface Account {
  id: number;
  name: string;
  balance: number;
  description: string;
}

interface Props {
  reloadKey?: string | number;
}

const WalletAccountList = ({ reloadKey }: Props) => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAccounts = () => {
    setLoading(true);
    api
      .get<Account[]>("/wallet/account")
      .then((response) => {
        setAccountList(response.data);
        setError(null);
      })
      .catch((error) => {
        setAccountList([]);
        setError("Ошибка при загрузке списка счетов: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAccounts();
  }, [reloadKey]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {loading
        ? Array.from({ length: 3 }).map((_, idx) => (
          <Card key={idx} variant="outlined">
            <CardContent>
              <Skeleton variant="text" width="60%" height={28} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="80%" height={20} />
            </CardContent>
          </Card>
        ))
        : accountList.map((row) => (
          <Card key={row.id} variant="outlined">
            <CardActionArea component={Link} to={`/wallet/account/${row.id}`}>
              <CardContent>
                <Typography variant="h6">{row.name}</Typography>
                <Typography
                  color={row.balance < 0 ? "error.main" : "success.main"}
                  fontWeight="bold"
                >
                  {row.balance.toLocaleString()} ₽
                </Typography>
                {row.description && (
                  <Typography variant="body2" color="text.secondary">
                    {row.description}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
};

export default WalletAccountList;
