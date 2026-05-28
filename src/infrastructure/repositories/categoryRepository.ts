import type {
  ICategoryRepository,
  ICategoryResponse,
} from "@domain/categories";
import { expensesApi } from "../http/axios.client";

export const categoryRepository: ICategoryRepository = {
  getAllCategories: async () => {
    const { data } = await expensesApi.get<ICategoryResponse[]>("/categories");
    return data;
  },

  createCategory: async (categoryData) => {
    const { data } = await expensesApi.post<ICategoryResponse>(
      "/categories",
      categoryData,
    );
    return data;
  },

  updateCategory: async (id, categoryData) => {
    const { data } = await expensesApi.patch<ICategoryResponse>(
      `/categories/${id}`,
      categoryData,
    );
    return data;
  },

  deleteCategory: async (id) => {
    const { data } = await expensesApi.delete<ICategoryResponse>(
      `/categories/${id}`,
    );
    return data;
  },
};
