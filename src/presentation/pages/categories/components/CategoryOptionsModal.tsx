import type { ICategoryResponse } from "@domain/categories";
import { useDeleteCategory } from "../hooks/useCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../index.module.css";

interface CategoryOptionsModalProps {
  open: boolean;
  category: ICategoryResponse | null;
  onClose: () => void;
  onEdit: (category: ICategoryResponse) => void;
  anchorRect: DOMRect | null; // Posición del botón ⋮ para ubicar el dropdown
}

export const CategoryOptionsModal = ({
  open,
  category,
  onClose,
  onEdit,
  anchorRect,
}: CategoryOptionsModalProps) => {
  const { mutate: deleteCategory } = useDeleteCategory();

  if (!category || !anchorRect || !open) return null;

  const top = anchorRect?.bottom + window.scrollY - 610;
  const left = anchorRect?.left + window.scrollX - 60; // Ajusta el valor para alinear a la derecha

  return (
    <div className={styles.options_modal_backdrop} onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" />

      {/* Modal */}
      <div
        className={styles.options_modal_container}
        style={{ top, left }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Options */}
        <div className={styles.options_modal_content}>
          <button
            onClick={() => {
              onEdit(category);
              onClose();
            }}
            className={`${styles.option_button} ${styles.option_button_edit}`}
          >
            <EditIcon />
            <span>Editar</span>
          </button>
          <button
            onClick={() => {
              deleteCategory(category.id);
              onClose();
            }}
            className={`${styles.option_button} ${styles.option_button_delete}`}
          >
            <DeleteIcon />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
