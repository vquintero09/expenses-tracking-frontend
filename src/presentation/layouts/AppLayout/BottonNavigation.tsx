import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
interface navItem {
  path: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}

const navItems: navItem[] = [
  { path: "/", label: "Inicio", icon: HomeOutlinedIcon, exact: true },
  { path: "/estadisticas", label: "Estadísticas", icon: BarChartOutlinedIcon },
  { path: "/movimientos", label: "Movimientos", icon: SwapHorizOutlinedIcon },
  { path: "/metas", label: "Metas", icon: TrackChangesOutlinedIcon },
  {
    path: "/cuentas",
    label: "Cuentas",
    icon: AccountBalanceWalletOutlinedIcon,
  },
];

export const BottonNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (item: navItem): boolean => {
    return item.exact ? pathname === item.path : pathname.startsWith(item.path);
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        {navItems.map((item) => {
          const isActiveItem = isActive(item);
          const { icon: Icon } = item;
          return (
            <li key={item.path}>
              <button
                type="button"
                onClick={() => navigate(item.path)}
                aria-label={item.label}
                className={styles.navigationButton}
              >
                {isActiveItem ? (
                  <span className={styles.activeNavItem}>
                    <Icon sx={{ color: "white" }} />
                    <span className={styles.activeNavLabel}>{item.label}</span>
                  </span>
                ) : (
                  <span className={styles.inactiveNavItem}>
                    <Icon sx={{ color: "gray" }} />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <div className=""></div>
    </nav>
  );
};
