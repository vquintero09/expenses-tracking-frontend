import { useGetTotalBalance } from "../hooks/useAccount";
import { BalanceCard } from "./BalanceCard";

export const TotalBalanceCard = () => {
  const { data, isLoading, isError } = useGetTotalBalance();

  return (
    <BalanceCard
      label="Saldo total"
      amount={data?.total_accounts_balance ?? 0}
      isLoading={isLoading}
      hasError={isError}
    />
  );
};
