import { useMutation } from "@tanstack/react-query"
import { updateQrCodeDescription } from "~/services/qrCodeService"

export const useQrCodeUpdateDescription = () => {
  return useMutation({
    mutationKey: ['QrCodeDescription'],
    mutationFn: ({id, description}: {id: number, description: string}) => updateQrCodeDescription(id, description),
  })
}