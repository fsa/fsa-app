import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "@/shared/api/useAuth";
import { useNavigate } from "@tanstack/react-router";

type LoginFormDto = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormDto>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormDto> = async (form: LoginFormDto) => {
    try {
      await login.mutateAsync(form);
      navigate({to: "/"});
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <Paper elevation={10} sx={{ margin: 8, padding: 3 }}>
      <Avatar
        sx={{
          mx: "auto",
          bgcolor: "secondary.main",
          textAlign: "center",
          mb: 2
        }}
      />
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Вход
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Имя пользователя"
          label="Логин"
          fullWidth
          required
          autoFocus
          sx={{ mb: 2 }}
          variant="outlined"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username", {
            required: "Логин обязателен",
            minLength: {
              value: 3,
              message: "Логин должен содержать минимум 3 символа",
            },
          })}
        />

        <TextField
          placeholder="Пароль"
          label="Пароль"
          fullWidth
          required
          sx={{ mb: 2 }}
          variant="outlined"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символов",
            },
          })}
        />

        {/* Ошибка от запроса авторизации */}
        {login.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {login.error.message === "Failed to refresh token"
              ? "Ошибка авторизации"
              : login.error.message}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isSubmitting || login.isPending}
        >
          {isSubmitting || login.isPending ? "Вход..." : "Войти"}
        </Button>
      </Box>
    </Paper>
  );
};
