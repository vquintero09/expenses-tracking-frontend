import { z } from "zod";

export const createCategorySchema = z.object({
  category_type: z.enum(["income", "expense"], {
    message: "El tipo de category debe ser 'income' o 'expense'",
  }),
  name: z
    .string({ error: "El campo name es requerido" })
    .min(1, "Escribre un nombre")
    .max(100, "el campo name no puede exeder los 100 caracteres"),
  icon: z
    .string({ error: "El campo icono es requerido" })
    .min(1, "Selecciona un icono"),
  bg_color: z
    .string({ error: "El campo color es requerido" })
    .min(1, "Selecciona un color"),
});

export const updateCategorySchema = createCategorySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type createCategorySchemaType = z.input<typeof createCategorySchema>;
