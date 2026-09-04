type MovementFilterValue = "income" | "expense" | undefined;

interface MovementFilterProps {
  value: MovementFilterValue;
  onChange: (value: MovementFilterValue) => void;
}

const OPTIONS: { label: string; value: MovementFilterValue }[] = [
  { label: "Todo", value: undefined },
  { label: "Ingresos", value: "income" },
  { label: "Gastos", value: "expense" },
];

export const MovementFilter = ({ value, onChange }: MovementFilterProps) => {
  return (
    <div className="flex gap-2 mb-4">
      {OPTIONS.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
              isSelected
                ? "bg-white text-black"
                : "bg-transparent text-text-on-surface-variant"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
