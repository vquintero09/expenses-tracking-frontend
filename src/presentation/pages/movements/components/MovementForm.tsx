import { useForm, type SubmitHandler } from "react-hook-form";
import {
  createMovementSchema,
  type CreateMovementSchemaType,
} from "../movement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./FormInput";
import { AmountField } from "./AmountField";
import { DateField } from "./FormDateField/DateField";
import { AccountSelector } from "./AccountSelector";
import { CategorySelector } from "./CategorySelector";
import type { CreateMovementInput } from "@/presentation/pages/movements/movement.schema";
import { useCreateMovement } from "../hooks/useMovement";
import dayjs from "dayjs";
import type { MovementType } from "@domain/movements";
import { useEffect } from "react";

const defaultValues: CreateMovementInput = {
  description: "",
  movement_type: "expense",
  amount: undefined,
  category_id: "",
  account_id: "",
  date: new Date(),
};
export const MovementForm = ({
  movementType,
}: {
  movementType: MovementType;
}) => {
  const { mutate: createMovement, isPending } = useCreateMovement();
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CreateMovementInput, unknown, CreateMovementSchemaType>({
    resolver: zodResolver(createMovementSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    reset();
  }, [movementType, reset]);

  const onSubmit: SubmitHandler<CreateMovementSchemaType> = (data) => {
    const payload = {
      ...data,
      movement_type: movementType,
      date: data.date ? dayjs(data.date).format("YYYY-MM-DD") : "",
    };
    createMovement(payload);

    console.log(payload);
    reset();
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="w-full bg-card border border-outline-variant rounded-[28px] p-5  flex flex-col">
        <FormInput
          control={control}
          name="description"
          label="NOMBRE"
          error={errors.description}
          placeholder="Descripción del movimiento"
          type="text"
        />
        <AmountField name="amount" control={control} />
        <DateField name="date" control={control} />
        <AccountSelector name="account_id" control={control} />
        <CategorySelector name="category_id" control={control} />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-white text-black p-2 mt-5 font-bold shadow-2xl shadow-white/30 hover:scale-95 transition-transform"
      >
        {isPending ? "Guardando..." : "Guardar Movimiento"}
      </button>
    </form>
  );
};
