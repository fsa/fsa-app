import { useMutation } from "@tanstack/react-query"
import { newQrCode } from "~/services/qrCodeService"

export const useNewQrCode = () => {
  return useMutation({
    mutationKey: ['QrCodeDescription'],
    mutationFn: ({ text, format_name }: { text: string; format_name: string }) => newQrCode(text, format_name),
  })
}