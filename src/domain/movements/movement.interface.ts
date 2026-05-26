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
export interface IMovementCategory {
  id: string;
  name: string;
}

export interface IMovementAccount {
  id: string;
  name: string;
}

export interface IMovementResponse {
  id: string;
  movement_type: MovementType;
  description: string;
  amount: number;
  date: string;
  category: IMovementCategory;
  account: IMovementAccount;
}
