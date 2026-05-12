import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { DateModal } from "./DateModal";
import { useState } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}
export const DateField = <T extends FieldValues>({
  name,
  control,
}: DateFieldProps<T>) => {
  const [open, setOpen] = useState(false);
  dayjs.locale("es");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const dateValue = field.value ? new Date(field.value) : null;

        return (
          <div className="space-y-1 pt-5">
            <button
              type="button"
              className="w-full flex items-center justify-between"
              onClick={() => setOpen(true)}
            >
              <div className="flex flex-col items-start">
                <span className="text-[12px] leading-6 tracking-wide font-medium text-text-on-surface-variant">
                  FECHA
                </span>
                <span className="text-[16px] text-white font-semibold">
                  {field.value
                    ? dayjs(field.value).format("D [de] MMMM, YYYY")
                    : "Seleccionar fecha"}
                </span>
              </div>
              <CalendarTodayOutlinedIcon sx={{ color: "white" }} />
            </button>

            <DateModal
              open={open}
              value={dateValue}
              onClose={() => setOpen(false)}
              onSelect={(date) => {
                field.onChange(date);
                setOpen(false);
              }}
            />

            <div className="h-px mt-3 bg-white/10 w-full" />
          </div>
        );
      }}
    />
  );
};
