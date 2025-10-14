import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/entities/movie/api/getMovies";

export const useMovieList = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
};