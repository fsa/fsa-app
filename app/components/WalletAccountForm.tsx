import { useState } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { api } from "~/services/api";

interface Props {
  onCreated?: () => void;
  onCancel?: () => void;
}

const WalletAccountForm = ({ onCreated, onCancel }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put("/wallet/account", { name, description });
      setName("");
      setDescription("");
      if (onCreated) onCreated();
    } catch (err: any) {
      setError("Ошибка при создании счёта: " + err.message);
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
        label="Название счёта"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={2}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Box display="flex" gap={2}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Сохранить"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onCancel?.()}
          disabled={loading}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};

export default WalletAccountForm;
