import { api } from "~/services/api";
import type { Movie } from "../model/types";

export const getMovies = async (): Promise<Movie[]> => {
  const response = await api.post<Movie[]>("/movie", {});
  return response.data;
};