import { useState } from "react";
import { MovementSelector } from "../../movements/components/MovementSelector";
import { createPortal } from "react-dom";
import styles from "../index.module.css";
import { ColorPickerField } from "./ColorPickerField";
import { FieldName } from "./FieldName";
import { IconPickerField } from "./IconPickerField";
import { PreviewCategory } from "./PreviewCategory";
import {
  createCategorySchema,
  type CreateCategoryInput,
  type createCategorySchemaType,
} from "../category.schema";
import {
  useForm,
  useWatch,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "../hooks/useCategory";

export interface ICreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const defaultValues: CreateCategoryInput = {
  category_type: "expense",
  name: "",
  icon: "",
  bg_color: "",
};

export const CreateCategoryModalContent = ({
  onClose,
}: Omit<ICreateCategoryModalProps, "open">) => {
  const [movementType, setMovementType] = useState<"expense" | "income">(
    "expense",
  );

  const { mutate: createCategory, isPending } = useCreateCategory();

  const { control, reset, handleSubmit, setValue } = useForm<
    CreateCategoryInput,
    unknown,
    createCategorySchemaType
  >({
    resolver: zodResolver(createCategorySchema),
    mode: "onChange",
    defaultValues,
  });

  const category_name = useWatch({ control, name: "name" });
  const category_icon = useWatch({ control, name: "icon" });
  const category_bg_color = useWatch({ control, name: "bg_color" });

  const handleMovementTypeChange = (value: "expense" | "income") => {
    setMovementType(value);
    setValue("category_type", value);
  };

  const onSubmit: SubmitHandler<createCategorySchemaType> = (data) => {
    createCategory(data);
    console.log(`Categoria agregada: `, data);
    reset();
    onClose();
  };

  const onError = (errors: FieldValues) => {
    console.log("Validation errors:", errors);
  };

  return (
    <main className={styles.create_modal_container}>
      <div className={styles.backgorund_modal}></div>
      <div className={`${styles.modal_container} ${styles.no_scrollbar}`}>
        <header className={styles.header_modal}>
          <h2 className={styles.header_title}>Crear Categoría</h2>
          <p className={styles.header_subtitle}>
            Personaliza tu nueva categoría para organizar tus gastos
          </p>
          <MovementSelector
            value={movementType}
            onChange={handleMovementTypeChange}
          />
        </header>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              Crear Categoria
            </button>
          </section>
        </form>
      </div>
    </main>
  );
};

export const CreateCategoryModal = ({
  open,
  onClose,
}: ICreateCategoryModalProps) => {
  const portalRoot = document.getElementById("modal-root");

  //No renderiza si el modal esta cerrado o si no se encuentra el elemento raíz
  if (!open || !portalRoot) return null;

  return createPortal(
    <CreateCategoryModalContent onClose={onClose} />,
    portalRoot,
  );
};
