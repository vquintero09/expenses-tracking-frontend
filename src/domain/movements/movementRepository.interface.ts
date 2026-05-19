import type { ICreateMovement, IMovementResponse } from "./movement.interface";

export interface IMovementRepository {
  getMovements(): Promise<IMovementResponse[]>;

  createMovement(expense: ICreateMovement): Promise<IMovementResponse>;

  deleteMovement(id: string): Promise<void>;
}
