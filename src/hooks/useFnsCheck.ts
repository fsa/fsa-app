import { useQuery } from "@tanstack/react-query"
import { fetchFnsCheck } from "@/services/fnsCheckService"

export const useFnsCheck = (id: number) => {
  return useQuery({
    queryKey: ['FnsCheck', id],
    queryFn: () => fetchFnsCheck(id),
  })
}