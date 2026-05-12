interface MovementSelectorProps {
  value: "expense" | "income";
  onChange: (value: "expense" | "income") => void;
}

export const MovementSelector = ({
  value = "expense",
  onChange,
}: MovementSelectorProps) => {
  return (
    <div className="bg-buttons-menu backdrop-blur-sm rounded-full mt-4 p-1 grid grid-cols-2 gap-1">
      <button
        className={`flex-1 font-semibold  py-2 px-4 rounded-full ${value === "expense" ? "bg-bg-button-selected text-text-button-selected shadow-lg shadow-white/20" : " bg-transparent text-text-button-unselected"}`}
        onClick={() => onChange("expense")}
      >
        Gasto
      </button>
      <button
        className={`flex-1 font-semibold py-2 px-4 rounded-full ${value === "income" ? "text-text-button-selected bg-bg-button-selected shadow-lg shadow-white/20" : "bg-transparent text-text-button-unselected"}`}
        onClick={() => onChange("income")}
      >
        Ingreso
      </button>
    </div>
  );
};
