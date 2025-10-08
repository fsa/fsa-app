import { useQuery } from "@tanstack/react-query"
import { fetchFnsChecksList } from "~/services/fnsCheckService"

export const useFnsChecks = (page: number) => {
  return useQuery({
    queryKey: ['FnsChecks', page],
    queryFn: () => fetchFnsChecksList(page),
  })
}