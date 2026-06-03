import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styles from "../index.module.css";
import { FormHelperText } from "@mui/material";

interface FieldNameProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const FieldName = <T extends FieldValues>({
  control,
  name,
}: FieldNameProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label htmlFor={name} className={styles.label_name}>
            NOMBRE
          </label>
          <input
            {...field}
            id={name}
            type="text"
            className={`${styles.input_field} ${fieldState.error ? styles.input_error : ""}`}
            placeholder="Nombre de la categoría"
          />
          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
        </div>
      )}
    />
  );
};
