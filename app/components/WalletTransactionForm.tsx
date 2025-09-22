import { useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { api } from "~/services/api";

interface Props {
  accountId: number;
  onCreated?: () => void;
  onCancel?: () => void;
}

export default function WalletTransactionForm({ accountId, onCreated, onCancel }: Props) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let operationAt: string | null = null;
      if (date) {
        operationAt = date + (time ? `T${time}:00`: 'T00:00:00');
      }

      await api.put(`/wallet/account/${accountId}/entry`, {
        amount: parseFloat(amount),
        description: description || null,
        operationAt,
      });

      setAmount("");
      setDescription("");
      setDate("");
      setTime("");

      onCreated?.();
    } catch (err: any) {
      setError("Ошибка при создании транзакции: " + err.message);
    } finally {
      setLoading(false);
    }
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
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Время операции"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Box display="flex" gap={2}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Сохранить"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
}
