import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./endpoints/weather.now";

export function useWeather(enabled: boolean = true) {
  return useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 10 * 60 * 1000, // 10 минут
    gcTime: 30 * 60 * 1000, // 30 минут
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    enabled,
  });
}
