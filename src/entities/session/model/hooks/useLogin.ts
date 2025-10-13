import { useMutation } from "@tanstack/react-query";
import { useSetToken } from "../sessionStore";
import { sessionApi } from "../../api/sessionApi";

export function useLogin() {
  const setToken = useSetToken();
  const api = sessionApi();

  return useMutation({
    mutationFn: api.login,
    onSuccess: (token) => setToken(token),
  });
}
