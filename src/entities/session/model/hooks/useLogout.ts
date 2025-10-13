import { useMutation } from "@tanstack/react-query";
import { useClearSession } from "../sessionStore";
import { sessionApi } from "../../api/sessionApi";

export function useLogout() {
  const clear = useClearSession();
  const api = sessionApi();

  return useMutation({
    mutationFn: api.invalidate,
    onSuccess: () => clear(),
  });
}
