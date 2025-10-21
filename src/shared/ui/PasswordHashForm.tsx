import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usePasswordHash } from "@/shared/api/usePasswordHash";

interface PasswordFormValues {
  password: string;
}

export const PasswordHashForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<PasswordFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, data, isPending, error } = usePasswordHash();

  const onSubmit: SubmitHandler<PasswordFormValues> = ({ password }) => {
    mutateAsync(password);
    reset();
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <TextField
        {...register("password", { required: "Введите пароль" })}
        label="Пароль"
        type={showPassword ? "text" : "password"}
        fullWidth
        autoComplete="new-password"
        name="password-hash-form-field"
        id="password-hash-form-field"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending}
        startIcon={isPending ? <CircularProgress size={18} /> : null}
      >
        Отправить
      </Button>

      {error && <Alert severity="error">Ошибка при хэшировании</Alert>}
      {data && (
        <Alert severity="success" sx={{ wordBreak: "break-all" }}>
          <Typography variant="subtitle2">Хэш пароля:</Typography>
          <Typography variant="body2">{data.data.hash}</Typography>
        </Alert>
      )}
    </Box>
  );
};
