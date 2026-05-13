import z from "zod";

export const movementSchema = z.object({
  id: z.string().uuid("El ID del movimiento no es válido"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(255, "La descripción no puede exceder los 255 caracteres"),
  amount: z.coerce
    .number({ message: "El monto es requerido" })
    .positive("El monto debe ser un número positivo"),
  category_id: z.string().min(1, "La categoría es requerida"),
  // .uuid("El ID de la categoría no es válido"),
  account_id: z.string().min(1, "La cuenta es requerida"),
  // .uuid("El ID de la cuenta no es válido"),
  date: z.date({ message: "La fecha no es válida" }),
});

// Schema para crear un movimiento, omitiendo el campo "id" que se genera automáticamente en el backend
export const createMovementSchema = movementSchema.omit({ id: true });

export type CreateMovementInput = z.input<typeof createMovementSchema>;
export type MovementSchemaType = z.infer<typeof movementSchema>;
export type CreateMovementSchemaType = z.infer<typeof createMovementSchema>;
