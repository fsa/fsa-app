import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import { menuConfig, type MenuEntry } from "~/app/menuConfig";
import { useNavigate } from "react-router";
import { hasRole } from "~/services/auth";

interface Props {
  onNavigate?: () => void
}

export function AppMenu({ onNavigate }: Props) {
  const navigate = useNavigate();

  const isAdmin = hasRole("ROLE_ADMIN");

  const isAllowed = (entry: MenuEntry) => {
    if (isAdmin) return true;
    if (!entry.roles) return true;
    return entry.roles.some((role) => hasRole(role));
  };

  return (
    <List>
      {menuConfig.map((entry, idx) => {
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
