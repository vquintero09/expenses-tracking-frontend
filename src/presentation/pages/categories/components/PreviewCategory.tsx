import { getICon } from "@/presentation/shared/constants/CategoryIcons";
import styles from "../index.module.css";

export const PreviewCategory = ({ categoryName }: { categoryName: string }) => {
  const getIconComponent = (name: string) => {
    const Icon = getICon(name);
    return <Icon fontSize="small" />;
  };
  return (
    <div className={styles.preview_container}>
      <div className={styles.icon_circle}>{getIconComponent("housing")}</div>

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
