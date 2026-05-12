import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "react-day-picker/locale";
import styles from "./date.module.css";

interface DateModalProps {
  open: boolean;
  value: Date | null;
  onClose: () => void;
  onSelect: (date: Date) => void;
}

export const DateModal = ({
  open,
  value,
  onClose,
  onSelect,
}: DateModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      <div
        className={`w-full bg-white m-5 p-5 rounded-2xl ${styles["animate-slide-up"]}`}
      >
        <header className="flex items-center justify-between mb-5">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            cancelar
          </button>
          <h2 className="text-lg font-semibold">Seleccionar Fecha</h2>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              if (value) onSelect(value);
            }}
          >
            Listo
          </button>
        </header>
        <DayPicker
          mode="single"
          selected={value ?? undefined}
          onSelect={(date) => {
            if (date) onSelect(date);
          }}
          navLayout="around"
          classNames={{
            months: "flex justify-center",
            month: "space-y-4",
            caption: "flex justify-center items-center pt-1",
            day: "w-10 h-10  rounded-full transition-colors",
          }}
          locale={es}
        />
      </div>
    </div>
  );
};
