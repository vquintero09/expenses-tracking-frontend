import { accountRepository } from "@/infrastructure/repositories/accountRepository";
import type { IUpdateAccount } from "@domain/accounts/account.interface";
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

export const useGetAccountById = (id: string) => {
  return useQuery({
    queryKey: accountKeys.detail(id),
    queryFn: () => accountRepository.getAccountById(id),
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
    onSuccess: () => {
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
    mutationFn: accountRepository.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.list() });
    },
    onError: (error) => {
      console.log(`Error in account delete mutation: ${error}`);
    },
  });
};
