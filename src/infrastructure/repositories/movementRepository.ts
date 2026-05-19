import { expensesApi } from "../http/axios.client";
import type { IMovementRepository, IMovementResponse } from "@domain/movements";

export const movementRepository: IMovementRepository = {
  getMovements: async () => {
    const { data } = await expensesApi.get<IMovementResponse[]>("/movements");
    return data;
  },

  createMovement: async (expense) => {
    const { data } = await expensesApi.post<IMovementResponse>(
      "/movements",
      expense,
    );
    return data;
  },

  deleteMovement: async (id) => {
    await expensesApi.delete(`/movements/${id}`);
  },
};
