import { useNavigate, useParams } from "react-router-dom";
import { useDeleteAccount, useGetAccountById } from "../hooks/useAccount";
import { useState } from "react";
import styles from "../index.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TuneIcon from "@mui/icons-material/Tune";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActionButton } from "./ActionButton";
import { AccountEditModal } from "./AccountEditModal";
import { AccountDeleteWarning } from "./AccountDeleteWarning";
import { BalanceCard } from "./BalanceCard";
import { AdjustBalanceModalContent } from "./AdjustBalanceModal";
import { TransferBalanceModal } from "./TransferBalanceModal";

export const AccountDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAdjustingBalance, setIsAdjustingBalance] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  //se pone true antes de hacer la mutación de eliminar. Mientras sea true, useGetAccountById no se ejecutará, evitando que se haga la query de obtener la cuenta mientras se está eliminando
  const [hasRequestedDelete, setHasRequestedDelete] = useState(false);

  const {
    data: account,
    isLoading,
    isError,
  } = useGetAccountById(id ?? "", !hasRequestedDelete);
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const handleDelete = () => {
    if (!id) return;

    setHasRequestedDelete(true);

    deleteAccount(id, {
      onSuccess: () => {
        navigate("/cuentas");
      },
    });
  };

  return (
    <main className={styles.account_detail_main}>
      <div className={styles.account_detail_content}>
        <button
          type="button"
          onClick={() => navigate("/cuentas")}
          className={styles.account_header_back}
        >
          <ArrowBackIcon />
          <span>Cuentas</span>
        </button>

        {isLoading && (
          <p className={styles.empty_message}>Cargando cuenta...</p>
        )}

        {isError && (
          <p className={styles.empty_message}>No se pudo cargar la cuenta.</p>
        )}

        {!isLoading && !account && !isError && (
          <p className={styles.empty_message}>Cuenta no encontrada.</p>
        )}

        {account && (
          <>
            <BalanceCard
              label={account.name}
              amount={account.current_balance}
            />
            {/* Fila de acciones */}
            <section className={styles.account_detail_actions}>
              <ActionButton
                label="Ajustar"
                icon={<TuneIcon />}
                onClick={() => setIsAdjustingBalance(true)}
              />
              <ActionButton
                label="Transferir"
                icon={<SwapHorizIcon />}
                onClick={() => setIsTransferOpen(true)}
              />
              <ActionButton
                label="Editar"
                icon={<EditIcon />}
                onClick={() => setIsEditOpen(true)}
              />
              <ActionButton
                label="Eliminar"
                icon={<DeleteIcon />}
                onClick={() => setIsConfirmingDelete(true)}
              />
            </section>

            {/* Advertencia de eliminación */}
            {isConfirmingDelete && (
              <AccountDeleteWarning
                accountName={account.name}
                isDeleting={isDeleting}
                onCancel={() => setIsConfirmingDelete(false)}
                onConfirm={handleDelete}
              />
            )}
          </>
        )}
      </div>

      <AccountEditModal
        open={isEditOpen}
        account={account ?? null}
        onClose={() => setIsEditOpen(false)}
      />

      <AdjustBalanceModalContent
        isOpen={isAdjustingBalance}
        onClose={() => setIsAdjustingBalance(false)}
        account={account ?? null}
      />

      <TransferBalanceModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        account={account ?? null}
      />
    </main>
  );
};
