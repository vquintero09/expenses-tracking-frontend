import { CATEGORY_COLORS } from "@/presentation/shared/constants/CategoryColors";
import style from "../index.module.css";
import {
  type FieldValues,
  type Control,
  type Path,
  Controller,
} from "react-hook-form";
import { FormHelperText } from "@mui/material";

interface ColorPickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const ColorPickerField = <T extends FieldValues>({
  control,
  name,
}: ColorPickerFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="mt-5">
          <p className={style.label_name}>COLOR</p>

          <section className={`${style.picker_section} ${style.no_scrollbar}`}>
            {CATEGORY_COLORS.map((color) => {
              const isSelected = field.value === color.name;
              return (
                <button
                  {...field}
                  type="button"
                  key={color.name}
                  title={color.name}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => field.onChange(color.name)}
                  className={`${style.color_button} ${isSelected ? style.color_button_selected : ""}`}
                />
              );
            })}
          </section>

          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
        </div>
      )}
    />
  );
};
