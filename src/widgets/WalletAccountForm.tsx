import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useWalletAccountCreate } from "@/hooks/useWalletAccountCreate";
import type { WalletAccountCreate } from "@/services/walletService";

type Inputs = {
  name: string
  description: string
}

interface Props {
  onCreated?: () => void;
  onCancel?: () => void;
}

const WalletAccountForm = ({ onCreated, onCancel }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { mutateAsync, isPending, isError, error } = useWalletAccountCreate();

  const onSubmit: SubmitHandler<Inputs> = async (account: WalletAccountCreate) => {
    await mutateAsync(account);
    if(onCreated) onCreated();
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="Название счёта*"
        {...register("name")}
        required
      />
      <TextField
        label="Описание"
        {...register("description")}
        multiline
        minRows={2}
      />

      {isError && <Typography color="error">Ошибка при создании счёта: {error.message}</Typography>}

      <Box display="flex" gap={2}>
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : "Сохранить"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onCancel?.()}
          disabled={isPending}
        >
          Отмена
        </Button>
      </Box>
    </Box>
  );
};

export default WalletAccountForm;
