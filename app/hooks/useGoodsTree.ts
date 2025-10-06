import { useQuery } from "@tanstack/react-query"
import { fetchChildren } from "~/services/goodsService"

export const useGoodsTree = (parentId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['GoodsTree', parentId],
    queryFn: () => fetchChildren(parentId),
    enabled,
  })
}