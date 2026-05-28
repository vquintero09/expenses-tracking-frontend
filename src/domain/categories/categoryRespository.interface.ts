import type {
  ICategoryResponse,
  ICreateCategory,
  IUpdateCategory,
} from "./categories.interface";

export interface ICategoryRepository {
  getAllCategories(): Promise<ICategoryResponse[]>;
  createCategory(category: ICreateCategory): Promise<ICategoryResponse>;
  updateCategory(
    id: string,
    categoryUpdate: IUpdateCategory,
  ): Promise<ICategoryResponse | null>;
  deleteCategory(id: string): Promise<ICategoryResponse | null>;
}
