import styles from "../index.module.css";

interface BalanceCardProps {
  label: string;
  amount: number;
  isLoading?: boolean;
  hasError?: boolean;
}

export const BalanceCard = ({
  label,
  amount,
  isLoading = false,
  hasError = false,
}: BalanceCardProps) => {
  return (
    <div className={styles.total_balance_card}>
      <div className={styles.total_balance_background} />
      <p className={styles.total_balance_label}>{label}</p>
      <div>
        {isLoading && (
          <span className={styles.total_balance_empty}>Cargando...</span>
        )}
        {!isLoading && hasError && (
          <span className={styles.total_balance_empty}>—</span>
        )}
        {!isLoading && !hasError && (
          <div className={styles.total_balance_amount_wrapper}>
            <h1 className={styles.total_balance_amount}>
              ${amount.toLocaleString("es-MX")}
            </h1>
            <span className={styles.total_balance_currency}>MXN</span>
          </div>
        )}
      </div>
    </div>
  );
};
