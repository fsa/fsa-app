import { useMutation, useQueryClient } from "@tanstack/react-query"
import { walletAccountCreate, type WalletAccountCreate } from "~/services/walletService";

export const useWalletAccountCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAccount: WalletAccountCreate) => walletAccountCreate(newAccount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['WalletAccounts'] });
    },
  });
}