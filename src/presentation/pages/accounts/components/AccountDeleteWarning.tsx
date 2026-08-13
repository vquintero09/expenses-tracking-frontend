import styles from "../index.module.css";

type AccountDeleteWarningProps = {
  accountName: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const AccountDeleteWarning = ({
  accountName,
  isDeleting,
  onCancel,
  onConfirm,
}: AccountDeleteWarningProps) => {
  return (
    <div className={styles.delete_warning_overlay}>
      <div className={styles.delete_warning_modal}>
        <p className={styles.delete_warning_text}>
          Esto eliminará la cuenta{" "}
          <span className={styles.delete_warning_name}>{accountName}</span> y
          todos sus movimientos asociados. Esta acción no se puede deshacer.
        </p>

        <div className={styles.delete_warning_actions}>
          <button
            type="button"
            className={styles.action_button}
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isDeleting}
            className={styles.delete_warning_confirm}
            onClick={onConfirm}
          >
            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};
