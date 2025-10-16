import { api } from '~/shared/api/api';
import type { Movie } from '../model/types';

export const getMovies = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/movie', {});
  return response.data;
};
