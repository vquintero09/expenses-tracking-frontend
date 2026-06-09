import { getICon } from "@/presentation/shared/constants/CategoryIcons";
import styles from "../index.module.css";

interface PreviewCategoryProps {
  categoryName: string | undefined;
  iconName: string | undefined;
  bgColor: string | undefined;
}

export const PreviewCategory = ({
  categoryName,
  iconName,
  bgColor,
}: PreviewCategoryProps) => {
  if (!iconName) return null;

  const getIconComponent = (name: string) => {
    const Icon = getICon(name);
    return <Icon fontSize="small" />;
  };
  return (
    <div className={styles.preview_container}>
      <div className={styles.icon_circle} style={{ color: bgColor }}>
        {getIconComponent(iconName)}
      </div>

      <div>
        {categoryName ? (
          <p className={styles.category_name}>{categoryName}</p>
        ) : (
          <div className={styles.skeleton_loading} />
        )}
      </div>
      <span className={styles.preview_label}>Vista previa</span>
    </div>
  );
};
