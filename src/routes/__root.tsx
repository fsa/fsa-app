import {
  createRootRoute,
  Outlet,
  HeadContent,
} from '@tanstack/react-router'
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material'
import { Refresh, Home } from '@mui/icons-material'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryProvider, AuthProvider } from '@/providers'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RootErrorBoundary,
  pendingComponent: HydrateFallback,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <QueryProvider>
        <AuthProvider>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools />
        </AuthProvider>
      </QueryProvider>
    </>
  )
}

function RootErrorBoundary({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : 'Произошла непредвиденная ошибка'
  const stack = error instanceof Error ? error.stack : undefined

  const handleRefresh = () => window.location.reload()
  const handleGoHome = () => window.location.href = '/'

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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
        >
          Произошла ошибка
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            size="large"
          >
            Обновить
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

        {stack && (
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              backgroundColor: 'grey.50',
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'auto',
              maxHeight: 400,
            }}
          >
            <Typography
              component="pre"
              sx={{
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.8rem',
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
              }}
            >
              {stack}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  )
}

function HydrateFallback() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress sx={{ m: 1 }} />
      <Typography>Загрузка...</Typography>
    </Box>
  )
}