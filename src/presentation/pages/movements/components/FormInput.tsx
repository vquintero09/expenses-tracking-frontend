import { FormHelperText } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
// import TextField from "@mui/material/TextField";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: React.HTMLInputTypeAttribute;
  error?: FieldError;
  type: string;
  placeholder: string;
}
export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  // error,
  type,
  placeholder,
}: FormInputProps<T>) => {
  // const isPriceField = name.toString().endsWith("amount");

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <label
              htmlFor={name}
              className="block text-[12px] leading-6 tracking-wide font-medium text-text-on-surface-variant"
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              {...field}
              placeholder={placeholder}
              className="w-full text-[16px] font-normal tracking-normal leading-6 border-none p-0 outline-0  focus:ring-0  text-white bg-transparent placeholder:text-white/30"
              onChange={(e) => field.onChange(e.target.value)}
            />

            <FormHelperText error>{fieldState.error?.message}</FormHelperText>

            {/* <TextField
              className="text-red-500"
              {...field}
              variant="standard"
              type={type}
              error={!!error}
              id={name}
              placeholder={placeholder}
              {...control.register(name)}
              fullWidth
              sx={{
                "& .MuiInputBase-input::placeholder": { color: "#6a7282" },
                "& .MuiInputBase-input": { color: "#FFFFFF" },
              }}
            /> */}
          </>
        )}
      />
      <div className="h-px mt-3 bg-white/10 w-full"></div>
    </div>
  );
};
