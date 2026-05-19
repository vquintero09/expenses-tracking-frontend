import { useState } from "react";
import { MovementSelector } from "./components/MovementSelector";
import { MovementForm } from "./components/MovementForm";
import { useMovement } from "./hooks/useMovement";
import dayjs from "dayjs";

export const Movements = () => {
  const [movementType, setMovementType] = useState<"expense" | "income">(
    "expense",
  );

  const { data: expenses, isLoading, isError, error } = useMovement();

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
          <MovementForm movementType={movementType} />
        </section>

        <section>
          {/* Aquí se mostrarán los movimientos registrados */}
          {isLoading && <p>Cargando movimientos...</p>}
          {isError && (
            <p>
              Error al cargar movimientos:{" "}
              {error instanceof Error ? error.message : "Error desconocido"}
            </p>
          )}
          {expenses && expenses.length === 0 && (
            <p>No hay movimientos registrados.</p>
          )}
          {expenses && expenses.length > 0 && (
            <ul className="space-y-4">
              {expenses.map((expense) => (
                <li key={expense.id} className="p-4 bg-white rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">
                        {expense.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {expense.category.name}{" "}
                        {dayjs(expense.date).format("YYYY-MM-DD")}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-red-500">
                      ${expense.amount}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
