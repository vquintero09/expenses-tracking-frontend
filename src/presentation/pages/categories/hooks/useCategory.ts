import { categoryRepository } from "@/infrastructure/repositories/categoryRepository";
import type { IUpdateCategory } from "@domain/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const categoryKey = {
  categories: ["categories"] as const,
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKey.categories,
    queryFn: categoryRepository.getAllCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryRepository.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.categories });
    },
    onError: (error) => {
      console.log(`Error in category creation mutation: ${error}`);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      categoryData,
    }: {
      id: string;
      categoryData: IUpdateCategory;
    }) => categoryRepository.updateCategory(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.categories });
    },
    onError: (error) => {
      console.log(`Error in category update mutation: ${error}`);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryRepository.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKey.categories });
    },
    onError: (error) => {
      console.log(`Error in category delete mutation: ${error}`);
    },
  });
};
