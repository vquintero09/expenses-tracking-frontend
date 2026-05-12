import { FormHelperText } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MovieIcon from "@mui/icons-material/Movie";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SchoolIcon from "@mui/icons-material/School";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LaptopIcon from "@mui/icons-material/Laptop";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface CategoryFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const mockCategories = [
  { id: "1", name: "Alimentación", icon: <FastfoodIcon />, bgHex: "#FFA500" },
  {
    id: "2",
    name: "Transporte",
    icon: <DirectionsCarIcon />,
    bgHex: "#3B82F6",
  },
  { id: "3", name: "Entretenimiento", icon: <MovieIcon />, bgHex: "#8B5CF6" },
  { id: "4", name: "Salud", icon: <MedicalServicesIcon />, bgHex: "#EF4444" },
  { id: "5", name: "Educación", icon: <SchoolIcon />, bgHex: "#10B981" },
  { id: "6", name: "Hogar", icon: <HomeFilledIcon />, bgHex: "#F59E0B" },
  { id: "7", name: "Ropa", icon: <CheckroomIcon />, bgHex: "#EC4899" },
  { id: "8", name: "Tecnología", icon: <LaptopIcon />, bgHex: "#3B82F6" },
  { id: "9", name: "Viajes", icon: <LocalAirportIcon />, bgHex: "#8B5CF6" },
  { id: "10", name: "Otros", icon: <MoreHorizIcon />, bgHex: "#6B7280" },
];
export const CategorySelector = <T extends FieldValues>({
  name,
  control,
}: CategoryFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-1 pt-5">
          <p className="text-[12px] leading-6 tracking-wide font-medium text-text-on-surface-variant">
            CATEGORÍA
          </p>

          <section className="grid grid-rows-2 grid-flow-col auto-cols-[72px] overflow-x-auto sm:grid-cols-5 py-2 gap-x-4 gap-y-3 ">
            {mockCategories.map((category) => {
              const isSelected = field.value === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className="flex flex-col items-center gap-2 min-w-16 sm:min-w-16 group"
                  onClick={() => field.onChange(category.id)}
                >
                  <section className="relative">
                    <div
                      className={` w-14 h-14 rounded-full flex items-center justify-center text-[14px] font-bold p-0.5 ${isSelected ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "bg-white/5"}`}
                    >
                      <span
                        style={
                          isSelected
                            ? { color: "#000000" }
                            : { color: category.bgHex }
                        }
                      >
                        {category.icon}
                      </span>
                    </div>
                  </section>
                  <section>
                    <p
                      className={`text-[11px] text-center leading-tights ${isSelected ? "text-white font-semibold " : "text-text-on-surface-variant"}`}
                    >
                      {category.name}
                    </p>
                  </section>
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
