import { accountRepository } from "@/infrastructure/repositories/accountRepository";
import type { IUpdateAccount } from "@domain/accounts/account.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const accountKeys = {
  accounts: ["accounts"] as const,
  list: () => [...accountKeys.accounts, "list"] as const,
};

export const useGetAccounts = () => {
  return useQuery({
    queryKey: accountKeys.list(),
    queryFn: accountRepository.getAllAccounts,
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
