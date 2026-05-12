import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface AmountFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}
export const AmountField = <T extends FieldValues>({
  control,
  name,
}: AmountFieldProps<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth variant="standard" sx={{ marginTop: 2 }}>
            <label
              htmlFor={name}
              className="block text-[12px] leading-6 tracking-wide font-medium text-text-on-surface-variant"
            >
              IMPORTE (MXM)
            </label>
            <Input
              {...field}
              value={field.value ?? ""}
              id="amount"
              type="string"
              inputMode="decimal"
              placeholder="0.00"
              startAdornment={
                <InputAdornment position="start" sx={{ color: "white" }}>
                  <AttachMoneyIcon />
                </InputAdornment>
              }
              error={!!fieldState.error}
              onChange={(e) => field.onChange(Number(e.target.value))}
              sx={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                "& .MuiInputBase-input:placeholder": {
                  color: "#6a7282",
                },
              }}
            />

            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </div>
  );
};
