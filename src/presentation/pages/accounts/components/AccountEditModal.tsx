import type {
  IAccountResponse,
  IUpdateAccount,
} from "@domain/accounts/account.interface";
import { useUpdateAccount } from "../hooks/useAccount";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAccountSchema } from "../account.schema";
import { FieldName } from "../../categories/components/FieldName";
import { ColorPicker } from "@/presentation/shared/components/ColorPicker";
import styles from "../index.module.css";

export interface IAccountEditModalProps {
  open: boolean;
  account: IAccountResponse | null;
  onClose: () => void;
}

export const AccountEditModal = ({
  open,
  account,
  onClose,
}: IAccountEditModalProps) => {
  const { mutate: updateAccount, isPending } = useUpdateAccount();

  const defaultValues: IUpdateAccount = {
    name: account?.name || "",
    bg_color: account?.bg_color || "",
  };

  const { control, reset, handleSubmit } = useForm<IUpdateAccount>({
    resolver: zodResolver(updateAccountSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<IUpdateAccount> = (data) => {
    if (!account) return;

    updateAccount({ id: account.id, accountData: data });
    reset();
    onClose();
  };

  if (!account || !open) return null;

  return (
    <main className={styles.create_modal_container}>
      <div className={styles.backgorund_modal} onClick={onClose} />
      <div className={`${styles.modal_container} ${styles.no_scrollbar}`}>
        <header className={styles.header_modal}>
          <h2 className={styles.header_title}>Editar Cuenta</h2>
          <p className={styles.header_subtitle}>
            Actualiza el nombre o el color de tu cuenta
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldName name="name" control={control} />
          <ColorPicker name="bg_color" control={control} />

          <section className={styles.action_buttons}>
            <button
              type="button"
              className={styles.action_button}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={styles.action_button}
            >
              {isPending ? "Guardando..." : "Guardar Cambios"}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};
