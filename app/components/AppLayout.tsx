import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { logout, getAccessToken, refreshToken, setAccessToken } from "../services/auth";
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppMenu } from "./AppMenu";

const drawerWidth = 240;

export default function AppLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    async function checkAuth() {
      let token = getAccessToken();

      if (!token) {
        try {
          token = await refreshToken();
          setAccessToken(token);
        } catch {
          navigate("/login", { replace: true });
          return;
        }
      }

      setChecking(false);
    }

    checkAuth();
  }, [navigate]);

  if (checking) return <div>Проверка авторизации...</div>;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  async function handleLogout() {
    await logout();
    navigate("/login");
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
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
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
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar /> {/* Отступ под AppBar */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
