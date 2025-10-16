import { api } from "~/shared/api/api";

interface WalletAccount {
  id: number;
  name: string;
  balance: number;
  description: string | null;
}

export interface WalletAccountOperation {
  id: number;
  description: string | null;
  operation_at: string
  created_at: string
}

export interface WalletAccountEntry {
  id: number;
  amount: string;
  operation: WalletAccountOperation;
}

export interface WalletAccountApi {
  account: WalletAccount;
  entries: WalletAccountEntry[];
}

export const fetchWalletAccountInfo = async (accountId: number): Promise<WalletAccountApi> => {
  const response = await api.get<WalletAccountApi>(`/wallet/account/${accountId}`);

  return response.data;
}

export interface WalletAccountTransaction {
  accountId: number;
  amount: number;
  description: string | null;
  operationAt: string | null;
}

export const newWalletAccountTransaction = async (transaction: WalletAccountTransaction): Promise<any> => {
  const response = await api.put<any>(`/wallet/account/${transaction.accountId}/entry`, {
    amount: transaction.amount,
    description: transaction.description,
    operationAt: transaction.operationAt
  });

  return response.data;
};

export interface WalletAccountCreate {
  name: string;
  description: string;
}

//TODO: возвращается новый аккаунт
export const walletAccountCreate = async (newAccount: WalletAccountCreate): Promise<any> => {
  const response = await api.put<any>(`/wallet/account`, newAccount);

  return response.data;
};
