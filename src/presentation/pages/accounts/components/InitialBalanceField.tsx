import { FormControl, FormHelperText } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styles from "../index.module.css";

interface InitialBalanceFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const InitialBalanceField = <T extends FieldValues>({
  control,
  name,
}: InitialBalanceFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth variant="standard">
          <label htmlFor={name} className={styles.label_name}>
            SALDO INICIAL
          </label>
          <input
            {...field}
            id={name}
            type="number"
            placeholder="$ 0.00"
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value === "" ? undefined : Number(e.target.value));
            }}
            className={styles.account_input}
          />
          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
