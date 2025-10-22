import { useFnsCheck } from "@/hooks/useFnsCheck";
import { LoadingIndicator } from "@/layout/LoadingIndicator";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Props {
  checkId: number;
}

function FnsCheckDetail({ checkId }: Props) {
  const { data: check, isLoading, isError, isFetching } = useFnsCheck(checkId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <Typography color="error" mt={2}>
        Не удалось загрузить данные чеков.
      </Typography>
    );
  }

  if (!check) {
    return (
      <Typography color="info" mt={2}>
        Данные пока недоступны.
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardHeader
          title={`Чек №${check.id} от ${new Date(
            check.datetime
          ).toLocaleString()}`}
        />
        <CardContent>
          {check.store && (
            <Typography>Магазин: {check.store.name}</Typography>
          )}
          <Typography>
            Адрес магазина:{" "}
            {check.retail_place_address || "Нет данных"}
          </Typography>
          <Typography>
            Место размещения: {check.retail_place || "Нет данных"}
          </Typography>
          <Typography>
            ИНН {check.store_itn}, фискальное устройство №
            {check.fiscal_drive_number}, фискальный документ №
            {check.fiscal_document_number}.
          </Typography>
          <Typography>
            Кассир: {check.operator || "Нет данных в чеке"}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Сумма: {check.total_sum} ₽
          </Typography>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table size="small">
          <caption>Позиции в чеке</caption>
          <TableHead>
            <TableRow>
              <TableCell>Товар</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Кол-во</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Наименование в чеке</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {check.fnsCheckItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.store_product?.name || ""}</TableCell>
                <TableCell>{item.price / 100} ₽</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.sum / 100} ₽</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { FnsCheckDetail };