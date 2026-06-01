import { useState } from "react";
import { MovementSelector } from "../../movements/components/MovementSelector";
import styles from "../index.module.css";
import { ColorPickerField } from "./ColorPickerField";
import { FieldName } from "./FieldName";
import { IconPickerField } from "./IconPickerField";
import { PreviewCategory } from "./PreviewCategory";

export const CreateCategoryModal = () => {
  const [movementType, setMovementType] = useState<"expense" | "income">(
    "expense",
  );

  const handleMovementTypeChange = (value: "expense" | "income") => {
    setMovementType(value);
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

        <section>
          <FieldName />
          <IconPickerField />
          <ColorPickerField />
          <PreviewCategory categoryName="Choco" />
        </section>

        <section className={styles.action_buttons}>
          <button className={styles.action_button}>Cancelar</button>
          <button className={styles.action_button}>Crear Categoria</button>
        </section>
      </div>
    </main>
  );
};
