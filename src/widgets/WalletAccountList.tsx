import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "~/services/api";
import { LoadingIndicator } from "~/shared/ui/LoadingIndicator";

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
  const [data, setData] = useState<Account[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState<{ message: string }>({ message: "" });

  const navigate = useNavigate();

  const loadAccounts = () => {
    setIsLoading(true);
    api
      .get<Account[]>("/wallet/account")
      .then((response) => {
        setData(response.data);
        setIsError(false);
        setError({ message: "" });
      })
      .catch((error) => {
        setData(null);
        setIsError(true);
        setError({ message: error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadAccounts();
  }, [reloadKey]);

  const handleAccountSelect = (accountId: number) => {
    navigate(`/wallet/account/${accountId}`);
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) return <Typography color="error">Ошибка при загрузке списка счетов: {error.message}</Typography>;

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="info" mt={2}>
          Данные пока недоступны.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        sx={{
          minWidth: 600,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Описание</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((account) => (
            <TableRow
              key={account.id}
              hover
              sx={{
                cursor: "pointer"
              }}
              onClick={() => handleAccountSelect(account.id)}
            >
              <TableCell>{account.id}</TableCell>
              <TableCell align="right"><Typography
                color={account.balance < 0 ? "error.main" : "success.main"}
                fontWeight="bold"
              >
                {account.balance.toLocaleString()} ₽
              </Typography></TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WalletAccountList;
