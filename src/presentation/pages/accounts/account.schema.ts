import z from "zod";

export const createAccountSchema = z.object({
  name: z
    .string({ error: "El campo name es requerido" })
    .min(1, "Escribre un nombre")
    .max(50, "el campo name no puede exeder los 50 caracteres"),
  bg_color: z
    .string({ error: "El campo color es requerido" })
    .min(1, "Selecciona un color"),
  initial_balance: z
    .number({ error: "El campo balance inicial es requerido" })
    .min(0, "El balance inicial no puede ser negativo"),
});

export const updateAccountSchema = createAccountSchema
  .omit({ initial_balance: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const adjustBalanceSchema = z.object({
  new_balance: z
    .string()
    .min(1, "El campo nuevo balance es requerido")
    .refine((value) => !isNaN(Number(value)), {
      message: "El saldo debe ser un número válido",
    }),
  reason: z
    .string()
    .max(255, "El motivo no puede exeder los 255 caracteres")
    .optional(),
});

export const transferBalanceSchema = z.object({
  to_account_id: z
    .string({ error: "El campo to_account_id es requerido" })
    .min(1, "Selecciona una cuenta destino"),
  amount: z
    .string()
    .min(1, "El monto es requerido")
    .refine((value) => !isNaN(Number(value)), {
      message: "El saldo debe ser un número válido",
    }),
});

export type IAdjustBalanceForm = z.infer<typeof adjustBalanceSchema>;
export type ITransferBalanceForm = z.infer<typeof transferBalanceSchema>;
