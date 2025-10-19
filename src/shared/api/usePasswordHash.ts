import { useMutation } from "@tanstack/react-query";
import { fetchPasswordHash } from "./endpoints/password_hash";

export const usePasswordHash = () => useMutation({
  mutationKey: ["password_hash"],
  mutationFn: fetchPasswordHash
});
