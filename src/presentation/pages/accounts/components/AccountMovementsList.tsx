import { MovementCard } from "@/presentation/shared/components/MovementCard";
import { useAccountMovements } from "../hooks/useAccount";
import styles from "../index.module.css";

interface IAccountMovementsListProps {
  accountId: string;
  type: "income" | "expense" | undefined;
  page: number;
  onPageChange: (newPage: number) => void;
}

export const AccountMovementsList = ({
  accountId,
  type,
  page,
  onPageChange,
}: IAccountMovementsListProps) => {
  const {
    data: movements,
    isLoading,
    isError,
    isPlaceholderData,
  } = useAccountMovements(accountId, { page, type });

  return (
    <div>
      {isLoading && (
        <p className={styles.empty_message}>Cargando movimientos...</p>
      )}

      {isError && (
        <p className={styles.empty_message}>
          No se pudieron cargar los movimientos.
        </p>
      )}

      {movements && movements.data.length === 0 && (
        <p className={styles.empty_message}>Aún no hay movimientos.</p>
      )}

      {movements && movements.data.length > 0 && (
        <div className="flex flex-col gap-3">
          {movements.data.map((movement) => (
            <MovementCard key={movement.id} movement={movement} />
          ))}
        </div>
      )}

      {movements && page < movements.total_pages && (
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={isPlaceholderData}
          className="w-full mt-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-[14px] font-medium disabled:opacity-50"
        >
          {isPlaceholderData ? "Cargando..." : "Cargar más"}
        </button>
      )}
    </div>
  );
};
