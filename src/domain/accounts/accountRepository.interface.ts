import type {
  IAccountResponse,
  IAdjustBalance,
  IAdjustBalanceResponse,
  ICreateAccount,
  ITotalBalance,
  IUpdateAccount,
} from "./account.interface";

export interface IAccountRepository {
  getAllAccounts(): Promise<IAccountResponse[]>;
  createAccount(accountData: ICreateAccount): Promise<IAccountResponse>;
  updateAccount(
    id: string,
    accountDataUpdate: IUpdateAccount,
  ): Promise<IAccountResponse | null>;
  deleteAccount(id: string): Promise<IAccountResponse | null>;

  getAccountById(id: string): Promise<IAccountResponse | null>;
  getTotalBalance(): Promise<ITotalBalance>;
  adjustBalance(
    id: string,
    adjustmentData: IAdjustBalance,
  ): Promise<IAdjustBalanceResponse>;
}
