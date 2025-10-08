import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useStoreCheckItems } from "~/hooks/useStoreCheckItems";
import type { TreeNode } from "~/services/storeService";

export function StoreProductDialog({
  product,
  open,
  onClose,
}: {
  product: TreeNode | null;
  open: boolean;
  onClose: () => void;
}) {
  const query =
    product && open
      ? useStoreCheckItems(product.productId!)
      : null;

  const items = query?.data ?? [];

  if (!query) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          minHeight: "70vh",
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle>{product?.name}</DialogTitle>
      <DialogContent dividers>
        {query.isLoading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}

        {query.error && (
          <Typography color="error" align="center">
            Ошибка загрузки данных
          </Typography>
        )}

        {!query.isLoading && !query.error && items.length === 0 && (
          <Typography color="text.secondary" align="center">
            Нет записей
          </Typography>
        )}

        {Array.isArray(items) && items.length > 0 && (
          <TableContainer component={Paper} elevation={1}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell align="right">Кол-во</TableCell>
                  <TableCell align="right">Цена, ₽</TableCell>
                  <TableCell align="right">Сумма, ₽</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  .slice()
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        {item.datetime
                          ? new Date(item.datetime).toLocaleDateString("ru-RU", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          : "-"}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {item.price.toLocaleString("ru-RU", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {item.sum.toLocaleString("ru-RU", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
}
