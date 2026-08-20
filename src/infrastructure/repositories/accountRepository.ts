import type { IAccountRepository } from "@domain/accounts/accountRepository.interface";
import { expensesApi } from "../http/axios.client";
import type {
  IAccountResponse,
  ITotalBalance,
} from "@domain/accounts/account.interface";

export const accountRepository: IAccountRepository = {
  getAllAccounts: async () => {
    const { data } = await expensesApi.get<IAccountResponse[]>("/accounts");
    return data;
  },

  getAccountById: async (id) => {
    const { data } = await expensesApi.get<IAccountResponse>(`/accounts/${id}`);
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

  getTotalBalance: async () => {
    const { data } = await expensesApi.get<ITotalBalance>(
      "/accounts/total-balance",
    );
    return data;
  },

  adjustBalance: async (id, adjustmentData) => {
    const { data } = await expensesApi.post(
      `/accounts/${id}/adjust`,
      adjustmentData,
    );
    return data;
  },

  transferBalance: async (id, transferData) => {
    const { data } = await expensesApi.post(
      `/accounts/${id}/transfer`,
      transferData,
    );
    return data;
  },
};
