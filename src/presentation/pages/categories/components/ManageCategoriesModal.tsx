import { getICon } from "@/presentation/shared/constants/CategoryIcons";
import { useGetCategories } from "../hooks/useCategory";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CategoryOptionsModal } from "./CategoryOptionsModal";
import { useState } from "react";
import type { ICategoryResponse } from "@domain/categories";
import styles from "../index.module.css";

interface IManageCategoriesModalProps {
  open: boolean;
  onClose: () => void;
}

export const ManageCategoriesModalContent = ({
  open,
  onClose,
}: IManageCategoriesModalProps) => {
  const { data: categories, isLoading } = useGetCategories();

  const [optionsCategory, setOptionsCategory] =
    useState<ICategoryResponse | null>(null);
  const [editCategory, setEditCategory] = useState<ICategoryResponse | null>(
    null,
  );
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const filteredCategories = categories?.filter(
    (category) => category.category_type == "expense",
  );

  const handleOpenOptions = (
    category: ICategoryResponse,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorRect(e.currentTarget.getBoundingClientRect());
    setOptionsCategory(category);
  };

  const getIconComponent = (name: string) => {
    const Icon = getICon(name);
    return <Icon fontSize="small" />;
  };

  if (!open) return null;

  console.log(styles.close_button);

  return (
    <>
      <main className={styles.create_modal_container}>
        <div className={styles.backgorund_modal} />

        <div className={styles.modal_container}>
          <header className={styles.header_modal}>
            <h2 className={styles.header_title}>Gestionar Categorías</h2>
            <p className={styles.header_subtitle}>
              Organiza y edita tus categorías actuales
            </p>
          </header>

          <section className={styles.categories_grid}>
            {filteredCategories?.map((category) => (
              <div key={category.id} className={styles.category_item}>
                <div className={styles.category_circle}>
                  <span style={{ color: category.bg_color }}>
                    {getIconComponent(category.icon)}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleOpenOptions(category, e)}
                    className={styles.category_options_btn}
                  >
                    <MoreVertIcon />
                  </button>
                  <CategoryOptionsModal
                    open={!!optionsCategory}
                    anchorRect={anchorRect}
                    category={optionsCategory}
                    onClose={() => setOptionsCategory(null)}
                    onEdit={(cat) => setEditCategory(cat)}
                  />
                </div>
                <span className={styles.category_label}>{category.name}</span>
              </div>
            ))}

            {!isLoading && filteredCategories?.length === 0 && (
              <p className={styles.empty_message}>
                No hay categorías para mostrar
              </p>
            )}
          </section>

          <button
            type="button"
            onClick={onClose}
            className={styles.close_button}
          >
            Cerrar
          </button>
        </div>
      </main>
    </>
  );
};
