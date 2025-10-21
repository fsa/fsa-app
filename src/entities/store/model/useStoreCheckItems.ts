import { useQuery } from "@tanstack/react-query"
import { fetchCheckItemsByProductId } from "@/entities/store"

export const useStoreCheckItems = (productId: number) => {
  return useQuery({
    queryKey: ['StoreCheckItems', productId],
    queryFn: () => fetchCheckItemsByProductId(productId),
  })
}