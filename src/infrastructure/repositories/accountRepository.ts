import type { IAccountRepository } from "@domain/accounts/accountRepository.interface";
import { expensesApi } from "../http/axios.client";
import type { IAccountResponse } from "@domain/accounts/account.interface";

export const accountRepository: IAccountRepository = {
  getAllAccounts: async () => {
    const { data } = await expensesApi.get<IAccountResponse[]>("/accounts");
    return data;
  },

  createAccount: async (accountData) => {
    const { data } = await expensesApi.post<IAccountResponse>(
      "/accounts",
      accountData,
    );
    return data;
  },

  updateAccount: async (id, accountDataUpdate) => {
    const { data } = await expensesApi.put<IAccountResponse>(
      `/accounts/${id}`,
      accountDataUpdate,
    );
    return data;
  },

  deleteAccount: async (id) => {
    const { data } = await expensesApi.delete<IAccountResponse | null>(
      `/accounts/${id}`,
    );
    return data;
  },
};
