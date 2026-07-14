import { useForm, type SubmitHandler } from "react-hook-form";
import { FieldName } from "../../categories/components/FieldName";
import { createAccountSchema } from "../account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InitialBalanceField } from "./InitialBalanceField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCreateAccount } from "../hooks/useAccount";
import type { ICreateAccount } from "@domain/accounts/account.interface";
import { ColorPicker } from "@/presentation/shared/components/ColorPicker";
import styles from "../index.module.css";
import type { AxiosError } from "axios";
import type { ApiError } from "@domain/apiError.interface";

type CreateAccountForm = {
  name: string;
  bg_color: string;
  initial_balance: number | undefined;
};

const defaultValues: CreateAccountForm = {
  name: "",
  bg_color: "",
  initial_balance: undefined,
};

export const CreateAccountModalContent = () => {
  const { mutate: createAccount, isPending, isError } = useCreateAccount();
  const { control, reset, handleSubmit, setError } = useForm<ICreateAccount>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<ICreateAccount> = (data) => {
    const payload: ICreateAccount = {
      ...data,
      initial_balance: data.initial_balance ?? 0,
    };
    createAccount(payload, {
      onSuccess: () => {
        reset(defaultValues);
        console.log("data", data);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 409) {
          setError("name", {
            type: "manual",
            message: "Ya existe una cuenta con este nombre.",
          });
          return;
        }
      },
    });
  };
  return (
    <div className={styles.account_container}>
      <header className={styles.account_header}>
        <div className={styles.account_header_back}>
          <ArrowBackIcon />
          <span>Cuentas</span>
        </div>
        <h2 className={styles.account_title}>Nueva cuenta</h2>
        <span className={styles.account_subtitle}>
          Crea una nueva cuenta para administrar tus finanzas.
        </span>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldName control={control} name="name" />
        <InitialBalanceField control={control} name="initial_balance" />
        <ColorPicker control={control} name="bg_color" />
        <button
          disabled={isPending}
          className={`${styles.account_button} ${isPending ? styles.account_disabled : ""}`}
        >
          {isPending ? "Creando..." : "Crear cuenta"}
        </button>
      </form>

      {isError && (
        <div className="mt-4 text-red-500">
          Ocurrió un error al crear una cuenta. Por favor, inténtalo de nuevo.
        </div>
      )}
    </div>
  );
};
