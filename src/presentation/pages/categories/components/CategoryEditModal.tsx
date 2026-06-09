import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../index.module.css";
import { ColorPickerField } from "./ColorPickerField";
import { FieldName } from "./FieldName";
import { IconPickerField } from "./IconPickerField";
import { PreviewCategory } from "./PreviewCategory";
import {
  updateCategorySchema,
  type UpdateCategoryInput,
} from "../category.schema";
import {
  useForm,
  useWatch,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCategory } from "../hooks/useCategory";
import type { ICategoryResponse } from "@domain/categories";
import { MovementSelector } from "../../movements/components/MovementSelector";

export interface ICategoryEditModalProps {
  open: boolean;
  category: ICategoryResponse | null;
  onClose: () => void;
}

export const CategoryEditModalContent = ({
  category,
  onClose,
}: Omit<ICategoryEditModalProps, "open">) => {
  const [movementType, setMovementType] = useState<"expense" | "income">(
    category?.category_type || "expense",
  );

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const defaultValues: UpdateCategoryInput = {
    name: category?.name || "",
    icon: category?.icon || "",
    bg_color: category?.bg_color || "",
    category_type: category?.category_type || "expense",
  };

  const { control, reset, handleSubmit, setValue } =
    useForm<UpdateCategoryInput>({
      resolver: zodResolver(updateCategorySchema),
      mode: "onChange",
      defaultValues,
    });

  // Preview values
  const category_name = useWatch({ control, name: "name" });
  const category_icon = useWatch({ control, name: "icon" });
  const category_bg_color = useWatch({ control, name: "bg_color" });

  const handleMovementTypeChange = (value: "expense" | "income") => {
    setMovementType(value);
    setValue("category_type", value);
  };

  const onSubmit: SubmitHandler<UpdateCategoryInput> = (data) => {
    if (!category) return;

    updateCategory({
      id: category.id,
      categoryData: data,
    });
    console.log(`Categoría actualizada:`, data);
    reset();
    onClose();
  };

  const onError = (errors: FieldValues) => {
    console.log("Validation errors:", errors);
  };

  if (!category) return null;

  return (
    <main className={styles.create_modal_container}>
      <div className={styles.backgorund_modal}></div>
      <div className={`${styles.modal_container} ${styles.no_scrollbar}`}>
        <header className={styles.header_modal}>
          <h2 className={styles.header_title}>Editar Categoría</h2>
          <p className={styles.header_subtitle}>
            Actualiza los detalles de tu categoría
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <MovementSelector
            value={movementType}
            onChange={handleMovementTypeChange}
          />
          {/* Sección de campos del formulario */}
          <section>
            <FieldName name="name" control={control} />
            <IconPickerField name="icon" control={control} />
            <ColorPickerField name="bg_color" control={control} />
          </section>

          {/* Vista previa de la categoría */}
          <PreviewCategory
            categoryName={category_name}
            iconName={category_icon}
            bgColor={category_bg_color}
          />

          {/* Botones de acción */}
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
              Guardar Cambios
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};

export const CategoryEditModal = ({
  open,
  category,
  onClose,
}: ICategoryEditModalProps) => {
  const portalRoot = document.getElementById("modal-root");

  // No renderiza si el modal está cerrado, si no hay categoría o si no se encuentra el elemento raíz
  if (!open || !category || !portalRoot) return null;

  return createPortal(
    <CategoryEditModalContent category={category} onClose={onClose} />,
    portalRoot,
  );
};
