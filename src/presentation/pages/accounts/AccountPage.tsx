import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useGetAccounts } from "./hooks/useAccount";
import { AccountCard } from "./components/AccountCard";
import { TotalBalanceCard } from "./components/TotalBalanceCard";
import styles from "./index.module.css";

export const AccountPage = () => {
  const { data: accounts, isLoading, isError, error } = useGetAccounts();

  return (
    <main className={styles.account_page_main}>
      <div className={styles.account_page_content}>
        <header className={styles.account_page_header}>
          <h1 className={styles.account_page_title}>Cuentas</h1>
          <h3 className={styles.account_page_subtitle}>
            Consulta y administra tus cuentas financieras
          </h3>
        </header>

        <TotalBalanceCard />

        <section className={styles.accounts_section}>
          <h2 className={styles.accounts_section_title}>Tus cuentas</h2>
          <Link to="/cuentas/nueva" className={styles.add_account_button}>
            <AddIcon fontSize="small" />
          </Link>
        </section>

        <section className={styles.accounts_list}>
          {isLoading && (
            <p className={styles.empty_message}>Cargando cuentas...</p>
          )}

          {isError && (
            <p className={styles.empty_message}>
              Error al cargar cuentas:{" "}
              {error instanceof Error ? error.message : "Error desconocido"}
            </p>
          )}

          {!isLoading && accounts?.length === 0 && (
            <p className={styles.empty_message}>
              No tienes cuentas registradas todavía.
            </p>
          )}

          {accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </section>
      </div>
    </main>
  );
};
