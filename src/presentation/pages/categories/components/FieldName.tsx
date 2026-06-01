import styles from "../index.module.css";

export const FieldName = () => {
  return (
    <div className="space-y-2">
      <label className={styles.label_name}>NOMBRE</label>
      <input
        type="text"
        className={styles.input_field}
        placeholder="Nombre de la categoría"
      />
    </div>
  );
};
