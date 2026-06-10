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
  anchorElement: HTMLElement | null; // Posición del botón ⋮ para ubicar el dropdown
}

export const CategoryOptionsModal = ({
  open,
  category,
  onClose,
  onEdit,
  anchorElement,
}: CategoryOptionsModalProps) => {
  const { mutate: deleteCategory } = useDeleteCategory();

  if (!category || !anchorElement || !open) return null;

  const react = anchorElement.getBoundingClientRect();

  const MENU_WIDTH = 130;

  const top = react.bottom;

  const left = Math.min(
    react.right - MENU_WIDTH,
    window.innerWidth - MENU_WIDTH - 10,
  );
  console.log("render modal");
  return (
    <div className={styles.options_modal_backdrop} onClick={onClose}>
      <div
        className={styles.options_modal_container}
        style={{ top, left }}
        onClick={(e) => e.stopPropagation()}
      >
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
  );
};
