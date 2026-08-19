import { accountRepository } from "@/infrastructure/repositories/accountRepository";
import type {
  IAdjustBalance,
  IUpdateAccount,
} from "@domain/accounts/account.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const accountKeys = {
  all: ["accounts"] as const,
  list: () => [...accountKeys.all, "list"] as const,
  details: () => [...accountKeys.all, "detail"] as const,
  detail: (id: string) => [...accountKeys.details(), id] as const,
  totalBalance: () => [...accountKeys.all, "total-balance"] as const,
};

export const useGetAccounts = () => {
  return useQuery({
    queryKey: accountKeys.list(),
    queryFn: accountRepository.getAllAccounts,
  });
};

export const useGetAccountById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: accountKeys.detail(id),
    queryFn: () => accountRepository.getAccountById(id),
    enabled: enabled && !!id,
    //enable permirte apagar la query desde el componente que la llama, para evitar que se ejecute si no hay un id valido
  });
};

export const useGetTotalBalance = () => {
  return useQuery({
    queryKey: accountKeys.totalBalance(),
    queryFn: accountRepository.getTotalBalance,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountRepository.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.list() });
      queryClient.invalidateQueries({ queryKey: accountKeys.totalBalance() });
    },
    onError: (error) => {
      console.log(`Error in account creation mutation: ${error}`);
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      accountData,
    }: {
      id: string;
      accountData: IUpdateAccount;
    }) => accountRepository.updateAccount(id, accountData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: accountKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: accountKeys.list() });
    },
    onError: (error) => {
      console.log(`Error in account update mutation: ${error}`);
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => accountRepository.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.list() });
      queryClient.invalidateQueries({ queryKey: accountKeys.totalBalance() });
    },
    onError: (error) => {
      console.log(`Error in account delete mutation: ${error}`);
    },
  });
};

export const useAdjustBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      adjustmentData,
    }: {
      id: string;
      adjustmentData: IAdjustBalance;
    }) => accountRepository.adjustBalance(id, adjustmentData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: accountKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: accountKeys.list() });
      queryClient.invalidateQueries({ queryKey: accountKeys.totalBalance() });
    },
    onError: (error) => {
      console.log(`Error in account balance adjustment mutation: ${error}`);
    },
  });
};
