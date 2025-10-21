import { useState } from "react";
import { AppBar, Box, Button, Container, CssBaseline, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppMenu } from "./AppMenu";
import { UserMenu } from "./UserMenu";
import { Login } from "@mui/icons-material";
import { useAuth } from "@/shared/api/useAuth";
import { Link, Outlet } from "@tanstack/react-router";


export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const logo = 'FSA';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated) {
    return (
      <>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            color="primary"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {logo}
              </Typography>
              <Button color="inherit" component={Link} to="/login">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Login />
                  <Typography>Войти</Typography>
                </Stack>
              </Button>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              overflowX: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg">
              <Outlet />
            </Container>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              FSA
            </Typography>
            <UserMenu />
          </Toolbar>
        </AppBar>

        {/* Боковое меню */}
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            <div>
              <Toolbar />
              <AppMenu onNavigate={handleDrawerToggle} />
            </div>
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            <div>
              <Toolbar />
              <AppMenu />
            </div>
          </Drawer>
        </Box>

        {/* Контент */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowX: "auto",
          }}
        >
          <Toolbar /> {/* Отступ под AppBar */}
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  );
}
