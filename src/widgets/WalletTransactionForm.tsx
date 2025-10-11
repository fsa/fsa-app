import { useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useWalletAccountTransaction } from "~/hooks/useWalletAccountTransaction";

interface Props {
  accountId: number;
  onCreated?: () => void;
  onCancel?: () => void;
}

export default function WalletTransactionForm({ accountId, onCreated, onCancel }: Props) {
  const { mutate, isPending, isError, error } = useWalletAccountTransaction();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        accountId,
        amount: parseFloat(amount),
        description: description || null,
        operationAt: (date ? (date + (time ? `T${time}:00` : 'T00:00:00')) : null),
      },
      {
        onSuccess: () => {
          setAmount("");
          setDescription("");
          setDate("");
          setTime("");

          onCreated?.();
        }
      }
    );

  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="Сумма"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={2}
        fullWidth
      />
      <Box display="flex" gap={2}>
        <TextField
          label="Дата операции"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
        <TextField
          label="Время операции"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
      </Box>

      {isError && <Typography color="error">Ошибка при создании транзакции: {error.message}</Typography>}

      <Box display="flex" gap={2}>
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : "Сохранить"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          disabled={isPending}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
}
