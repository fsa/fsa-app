import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useApiClient } from "@/shared/api/apiClient";
import { getTokenLifetimeMs } from "@/shared/lib/jwt";
import { useAccessToken } from "@/entities/session/model/sessionStore";

export function useApiQuery<T>(
  key: string[],
  url: string,
  options?: UseQueryOptions<T>
) {
  const token = useAccessToken();
  const client = useApiClient();
  const staleTime = getTokenLifetimeMs(token);

  return useQuery<T>({
    queryKey: key,
    queryFn: async () => (await client.get<T>(url)).data,
    staleTime,
    ...options,
  });
}
