import { movementRepository } from "@/infrastructure/repositories/movementRepository";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const movementKeys = {
  all: ["expenses"] as const,
  lists: () => [...movementKeys.all, "list"] as const,
};

export const useMovement = () => {
  return useQuery({
    queryKey: movementKeys.lists(),
    queryFn: movementRepository.getMovements,
  });
};

export const useCreateMovement = () => {
  const queryCliente = useQueryClient();

  return useMutation({
    mutationFn: movementRepository.createMovement,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: movementKeys.lists() });
    },
    onError: (error) => {
      console.log(`Error en la mutación: ${error}`);
    },
  });
};

export const useDeleteMovement = () => {
  const queryCliente = useQueryClient();

  return useMutation({
    mutationFn: movementRepository.deleteMovement,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: movementKeys.lists() });
    },
    onError: (error) => {
      console.log(`Error en la mutación al eliminar: ${error}`);
    },
  });
};
