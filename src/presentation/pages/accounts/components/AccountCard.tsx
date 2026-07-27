import { Link } from "react-router-dom";
import { CATEGORY_COLORS } from "@/presentation/shared/constants/CategoryColors";
import type { IAccountResponse } from "@domain/accounts/account.interface";
import styles from "../index.module.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";

interface AccountCardProps {
  account: IAccountResponse;
}

const getColorHex = (colorName: string): string => {
  return CATEGORY_COLORS.find((c) => c.name === colorName)?.hex ?? "#64748B";
};

export const AccountCard = ({ account }: AccountCardProps) => {
  const hexColor = getColorHex(account.bg_color);

  return (
    <Link to={`/cuentas/${account.id}`} className={styles.account_card}>
      <div
        className={styles.account_avatar}
        style={{
          background: `${hexColor}20`,
          border: `1px solid ${hexColor}33`,
        }}
      >
        <CreditCardIcon style={{ color: hexColor }} />
      </div>

      <div className={styles.account_info}>
        <p className={styles.account_name}>{account.name}</p>
        <p className={styles.account_type_label}>Cuenta</p>
      </div>

      <p className={styles.account_amount}>
        ${account.current_balance.toLocaleString("es-MX")}
      </p>
    </Link>
  );
};
