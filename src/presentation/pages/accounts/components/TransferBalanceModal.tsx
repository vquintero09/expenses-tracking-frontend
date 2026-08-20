import type {
  IAccountResponse,
  ITransferPayload,
} from "@domain/accounts/account.interface";
import { useGetAccounts, useTransfer } from "../hooks/useAccount";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transferBalanceSchema,
  type ITransferBalanceForm,
} from "../account.schema";
import { InputFieldController } from "@/presentation/shared/components/InputFieldController";
import type { AxiosError } from "axios";
import type { ApiError } from "@domain/apiError.interface";
import { useState } from "react";
import { FormHelperText } from "@mui/material";

interface ITransferBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: IAccountResponse | null;
}

export const TransferBalanceModal = ({
  account,
  onClose,
  isOpen,
}: ITransferBalanceModalProps) => {
  const { data: accounts } = useGetAccounts();
  const { mutate: transferBalance, isPending } = useTransfer();
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<ITransferBalanceForm>({
    resolver: zodResolver(transferBalanceSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      to_account_id: "",
    },
  });

  const destinationAccounts =
    accounts?.filter((a) => a.id !== account?.id) ?? [];

  const onSubmit: SubmitHandler<ITransferBalanceForm> = (data) => {
    if (!account) return;

    const transferData: ITransferPayload = {
      to_account_id: data.to_account_id,
      amount: Number(data.amount),
    };

    transferBalance(
      { id: account.id, transferData },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: (error) => {
          const axiosError = error as AxiosError<ApiError>;
          setFormError(
            axiosError.response?.data.error ??
              "No se pudo realizar la transferencia",
          );
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
          <Controller
            name="to_account_id"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <select
                  {...field}
                  className="w-full bg-gray-800 text-white placeholder:text-gray-500 border border-outline-variant focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar cuenta destino</option>
                  {destinationAccounts?.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
                <FormHelperText error>
                  {fieldState.error?.message}
                </FormHelperText>
              </>
            )}
          />

          <InputFieldController control={control} name="amount" label="MONTO" />

          {formError && (
            <p className="text-[13px] text-red-400 text-center">{formError}</p>
          )}

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
              {isPending ? "Transfiriendo..." : "Transferir Monto"}
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};
