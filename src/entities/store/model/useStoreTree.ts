import { useQuery } from "@tanstack/react-query"
import { fetchChildren } from "@/entities/store"

export const useStoreTree = (parentId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['StoreTree', parentId],
    queryFn: () => fetchChildren(parentId),
    enabled,
  })
}