import { useState } from "react";
import { MovementSelector } from "./components/MovementSelector";
import { MovementForm } from "./components/MovementForm";

export const Movements = () => {
  const [movementType, setMovementType] = useState<"expense" | "income">(
    "expense",
  );

  const handleMovementTypeChange = (value: "expense" | "income") => {
    setMovementType(value);
  };

  return (
    <main className="min-h-screen px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-16">
      <div className="w-full max-w-sm mx-auto sm:max-w-md">
        <header className="mb-6 sm:mb-10">
          <h1 className="text-[26px] sm:text-[30px] font-bold text-title leading-tight tracking-tight">
            Movimientos
          </h1>
          <h3 className="text-subtitle text-[15px] sm:text-[18px] mt-1 font-medium">
            Gestiona y registra tus ingresos y gastos diarios
          </h3>

          <MovementSelector
            value={movementType}
            onChange={handleMovementTypeChange}
          />
        </header>

        <section>
          <MovementForm />
        </section>
      </div>
    </main>
  );
};
