export type CategoryType = "income" | "expense";

//Payload de creación
export interface ICreateCategory {
  category_type: CategoryType;
  name: string;
  icon: string;
  bg_color: string;
}

//Payload de actualización
export interface IUpdateCategory {
  category_type?: CategoryType;
  name?: string;
  icon?: string;
  bg_color?: string;
}

//Respuestas publicas
export interface ICategoryResponse {
  id: string;
  category_type?: CategoryType;
  name: string;
  icon: string;
  bg_color: string;
}
