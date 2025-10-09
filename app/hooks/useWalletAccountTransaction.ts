import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newWalletAccountTransaction, type WalletAccountTransaction } from "~/services/walletService";

export const useWalletAccountTransaction = (accountId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['WalletAccount', accountId],
    mutationFn: (transaction: WalletAccountTransaction) => newWalletAccountTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['WalletAccount', accountId] });
    },
  });
}