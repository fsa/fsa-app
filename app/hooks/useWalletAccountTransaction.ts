import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newWalletAccountTransaction, type WalletAccountTransaction } from "~/services/walletService";

export const useWalletAccountTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: WalletAccountTransaction) => newWalletAccountTransaction(transaction),
    onSuccess: (_, transaction) => {
      queryClient.invalidateQueries({ queryKey: ['WalletAccount', transaction.accountId] });
    },
  });
}