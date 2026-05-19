export type MovementType = "income" | "expense";

export interface ICreateMovement {
  movement_type: MovementType;
  amount: number;
  category_id: string;
  account_id: string;
  date: Date | string;
  description: string;
}

// Response interfaces
export interface ICategoryResponse {
  id: string;
  name: string;
}

export interface IAccountResponse {
  id: string;
  name: string;
}

export interface IMovementResponse {
  id: string;
  movement_type: MovementType;
  description: string;
  amount: number;
  date: string;
  category: ICategoryResponse;
  account: IAccountResponse;
}
