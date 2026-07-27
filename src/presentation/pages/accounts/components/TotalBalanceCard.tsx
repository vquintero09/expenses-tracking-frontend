import { useGetTotalBalance } from "../hooks/useAccount";
import styles from "../index.module.css";

export const TotalBalanceCard = () => {
  const { data, isLoading, isError } = useGetTotalBalance();

  return (
    <div className={styles.total_balance_card}>
      <p className={styles.total_balance_label}>Saldo total</p>
      <p className={styles.total_balance_amount}>
        {isLoading && "Cargando..."}
        {isError && "—"}
        {data && (
          <>
            ${data.total_accounts_balance.toLocaleString("es-MX")}{" "}
            <span className={styles.total_balance_currency}>MXN</span>
          </>
        )}
      </p>
    </div>
  );
};
