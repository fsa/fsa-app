import { api } from "~/shared/api/api";
import type { TreeNode } from "./storeService";

export interface QrCodeRegister {
  id: number;
  data: string;
  formatName: string;
  createdAt: string;
  description: string;
  editable: boolean;
  product: TreeNode;
}

const newQrCode = (text: string, format_name: string): Promise<QrCodeRegister> => {
  return api.post<QrCodeRegister>("/scan", { text, format_name, format: 0 })
    .then(response => response.data);
};

const updateQrCodeDescription = (id: Number, description: string): Promise<QrCodeRegister> => {
  return api.post<QrCodeRegister>(`/scan/update-description`, { id, description })
    .then(response => response.data);
}

export { newQrCode, updateQrCodeDescription };
