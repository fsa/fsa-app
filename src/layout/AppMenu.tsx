import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import { configMainMenu, type MenuEntry } from "@/config/MainMenu";
import { useNavigate } from "react-router";
import { useAuth } from "@/shared/api/useAuth";

interface Props {
  onNavigate?: () => void
}

export function AppMenu({ onNavigate }: Props) {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const isAdmin = isAuthenticated && user?.roles.includes("ROLE_ADMIN");

  const isAllowed = (entry: MenuEntry) => {
    if (isAdmin) return true;
    if (!entry.roles || entry.roles.length === 0) return true;
    if (!isAuthenticated || !user) return false;
    return entry.roles.some(role => user.roles.includes(role));
  };

  return (
    <List>
      {configMainMenu.map((entry, idx) => {
        if (!isAllowed(entry)) return null;

        switch (entry.type) {
          case "item":
            const isActive = location.pathname === entry.path;
            return (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    navigate(entry.path);
                    if (onNavigate) onNavigate();
                  }}
                >
                  <ListItemIcon>{entry.icon}</ListItemIcon>
                  <ListItemText primary={entry.title} />
                </ListItemButton>
              </ListItem>
            );
          case "divider":
            return <Divider key={idx} />;
          case "section":
            return (
              <ListSubheader key={idx} disableSticky>
                {entry.title}
              </ListSubheader>
            );
          default:
            return null;
        }
      })}
    </List>
  );
}
