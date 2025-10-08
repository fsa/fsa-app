import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
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

  if(!query) {
    return <></>
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product?.name}</DialogTitle>
      <DialogContent>
        {query.isLoading && <CircularProgress />}
        {query.error && (
          <Typography color="error">Ошибка загрузки данных</Typography>
        )}
        {!query.isLoading && !query.error && items.length === 0 && (
          <Typography color="text.secondary">Нет записей</Typography>
        )}
        {Array.isArray(items) && items.length > 0 && (
          <List>
            {items.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`Цена: ${item.price}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
