import {
  getICon,
  ICON_NAMES,
} from "@/presentation/shared/constants/CategoryIcons";
import style from "../index.module.css";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormHelperText } from "@mui/material";

interface IconPickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const IconPickerField = <T extends FieldValues>({
  control,
  name,
}: IconPickerFieldProps<T>) => {
  const getIconComponent = (name: string) => {
    const Icon = getICon(name);
    return <Icon fontSize="small" />;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="mt-4">
          <h4 className={style.label_name}>ICONO</h4>

          <section
            className={`${style.icon_picker_section} ${style.no_scrollbar}`}
          >
            {ICON_NAMES.map((iconName) => {
              const isSelected = field.value === iconName;
              return (
                <button
                  {...field}
                  type="button"
                  key={iconName}
                  onClick={() => field.onChange(iconName)}
                  className={`${style.icon_button} ${isSelected ? style.icon_button_selected : style.icon_button_unselected}`}
                >
                  {getIconComponent(iconName)}
                </button>
              );
            })}
          </section>

          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
        </div>
      )}
    />
  );
};
