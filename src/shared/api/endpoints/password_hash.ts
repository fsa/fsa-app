import { api } from "../api"

interface HashResponse {
  hash: string;
}

export const fetchPasswordHash = (password: string) => {
  return api.post<HashResponse>('/password_hash', { password });
}