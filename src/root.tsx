import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Alert, Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { Refresh, Home } from '@mui/icons-material';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=latin,cyrillic",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon-96x96.png",
    sizes: "96x96"
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.svg"
  },
  {
    rel: "shortcut icon",
    href: "/favicon.ico"
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png"
  },
  {
    rel: "manifest",
    href: "/site.webmanifest"
  }
];

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();

  let message = "Ой! Произошла непредвиденная ошибка";
  let details = "Попробуйте обновить страницу или вернуться на главную.";
  let stack: string | undefined;
  let statusCode: number | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    message = error.status === 404 ? "Страница не найдена" : "Произошла ошибка";
    details =
      error.status === 404
        ? "Запрошенная вами страница не существует или была перемещена."
        : error.statusText || "Произошла ошибка при обработке вашего запроса.";
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '60vh',
          justifyContent: 'center',
        }}
      >
        {/* Код ошибки */}
        {statusCode && (
          <Typography
            variant="h1"
            component="div"
            sx={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: 'primary.main',
              opacity: 0.1,
              mb: 2
            }}
          >
            {statusCode}
          </Typography>
        )}

        {/* Иконка и заголовок */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1
            }}
          >
            {message}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: '1.1rem',
              maxWidth: 500,
              lineHeight: 1.6
            }}
          >
            {details}
          </Typography>
        </Box>

        {/* Кнопки действий */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            size="large"
          >
            Обновить страницу
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={handleGoHome}
            size="large"
          >
            На главную
          </Button>
        </Box>

        {/* Детали ошибки для разработки */}
        {stack && (
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <Alert
              severity="info"
              sx={{ mb: 2 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => navigator.clipboard.writeText(stack || '')}
                >
                  Копировать
                </Button>
              }
            >
              Детали ошибки (только для разработки)
            </Alert>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                backgroundColor: 'grey.50',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'auto',
                maxHeight: 400
              }}
            >
              <Typography
                component="pre"
                sx={{
                  margin: 0,
                  fontFamily: '"Fira Code", "Roboto Mono", monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  color: 'text.primary'
                }}
              >
                {stack}
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export function HydrateFallback() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // на всю высоту экрана
    >
      <CircularProgress />
    </Box>
  )
}