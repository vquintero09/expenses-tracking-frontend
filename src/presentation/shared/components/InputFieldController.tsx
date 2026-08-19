import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FormHelperText } from "@mui/material";

interface FieldNameProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export const InputFieldController = <T extends FieldValues>({
  control,
  name,
  label,
}: FieldNameProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label
            htmlFor={name}
            className="text-[14px] leading-6 tracking-wider font-medium text-text-on-surface-variant"
          >
            {label}
          </label>
          <input
            {...field}
            id={name}
            type="text"
            inputMode="decimal"
            placeholder="$ 0.00"
            value={field.value ?? ""}
            className=" w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 text-white focus:ring-1 focus:ring-white/50 focus:outline-none placeholder:text-white/20"
          />
          <FormHelperText error>{fieldState.error?.message}</FormHelperText>
        </div>
      )}
    />
  );
};
