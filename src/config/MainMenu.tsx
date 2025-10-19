import HomeIcon from "@mui/icons-material/Home";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WalletIcon from '@mui/icons-material/Wallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PasswordIcon from '@mui/icons-material/Password';

export type MenuEntry =
  | {
    type: "item";
    title: string;
    path: string;
    icon: React.ReactNode;
    roles?: string[];
  }
  | { type: "divider"; roles?: string[] }
  | { type: "section"; title: string; roles?: string[] };

export const configMainMenu: MenuEntry[] = [
  { type: "item", title: "Главная", path: "/", icon: <HomeIcon /> },
  { type: "item", title: "Сканер", path: "/scanner", icon: <QrCode2Icon /> },
  { type: "item", title: "Сериалы", path: "/movie", icon: <LocalMoviesIcon /> },
  { type: "item", title: "Пароли", path: "/password", icon: <PasswordIcon /> },
  { type: "item", title: "Чеки", path: "/checks", icon: <ReceiptIcon /> },
  { type: "item", title: "Товары", path: "/store", icon: <ShoppingCartIcon /> },
  { type: "item", title: "Кошелёк", path: "/wallet", icon: <WalletIcon /> },
];
