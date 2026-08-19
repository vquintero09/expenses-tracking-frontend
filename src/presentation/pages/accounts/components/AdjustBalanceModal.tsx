import type {
  IAccountResponse,
  IAdjustBalance,
} from "@domain/accounts/account.interface";
import { useAdjustBalance } from "../hooks/useAccount";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adjustBalanceSchema,
  type IAdjustBalanceForm,
} from "../account.schema";
import { FieldName } from "../../categories/components/FieldName";
import { InputFieldController } from "@/presentation/shared/components/InputFieldController";
import { useEffect } from "react";
import type { AxiosError } from "axios";
import type { ApiError } from "@domain/apiError.interface";

interface IAdjustBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: IAccountResponse | null;
}

export const AdjustBalanceModalContent = ({
  account,
  onClose,
  isOpen,
}: IAdjustBalanceModalProps) => {
  const { mutate: adjustBalance, isPending } = useAdjustBalance();

  const { control, handleSubmit, reset, setError } =
    useForm<IAdjustBalanceForm>({
      resolver: zodResolver(adjustBalanceSchema),
      mode: "onChange",
      defaultValues: {
        new_balance: "",
        reason: "",
      },
    });

  useEffect(() => {
    if (isOpen && account) {
      reset({
        new_balance: String(account.current_balance),
        reason: "",
      });
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<IAdjustBalanceForm> = (data) => {
    if (!account) return;

    const adjustmentData: IAdjustBalance = {
      new_balance: Number(data.new_balance),
      reason: data.reason,
    };

    adjustBalance(
      { id: account.id, adjustmentData },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiError>;
          if (axiosError.response?.status === 400) {
            setError("new_balance", {
              type: "onChange",
              message:
                "El saldo actual ya coincide con el nuevo saldo indicado",
            });
          }
        },
      },
    );
  };

  if (!isOpen || !account) return null;

  return (
    <main className="fixed inset-0 z-60 flex items-end justify-center pb-1  transition-opacity duration-300">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl mx-4 rounded-4xl shadow-lg overflow-hidden border border-outline-variant bg-card">
        <header className="px-6 py-3 ">
          <h2 className="text-lg font-semibold text-white">Ajuste de Saldo</h2>
          <p className="text-sm text-gray-500 mt-1">
            Indica el saldo real de ${account.name} y generaremos el movimiento
            correspondiente
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-5 mb-5">
          <InputFieldController
            control={control}
            name="new_balance"
            label="NUEVO SALDO"
          />
          <FieldName control={control} name="reason" />

          <section className="flex gap-3 mt-4 ">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-full bg-white/10 text-white font-semibold transition-all duration-200 hover:bg-white/20"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2 rounded-full bg-white/10 text-white font-semibold transition-all duration-200 hover:bg-white/20"
            >
              {isPending ? "Adjustando..." : "Ajustar Saldo"}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};
