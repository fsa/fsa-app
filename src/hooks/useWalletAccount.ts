import { useQuery } from "@tanstack/react-query"
import { fetchWalletAccountInfo } from "@/services/walletService"

export const useWalletAccount = (accountId: number) => {
  return useQuery({
    queryKey: ['WalletAccount', accountId],
    queryFn: () => fetchWalletAccountInfo(accountId),
  })
}