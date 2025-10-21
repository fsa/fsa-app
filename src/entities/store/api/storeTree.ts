import { api } from "@/shared/api/api";
import type { StoreCheckItem, TreeNode } from "../model/types";

interface ApiNode {
  id: number;
  name: string;
  path: string;
  is_name_inherited: boolean;
}

interface ApiItem {
  id: number;
  name: string;
  manufacture_id: number | null;
  barcode: string | null;
  category_path: string | null;
}

interface ApiResponse {
  nodes: ApiNode[];
  items: ApiItem[];
}

function adaptApiNode(apiNode: ApiNode): TreeNode {
  return {
    id: String(apiNode.path),
    name: apiNode.name,
  };
}

function adaptApiItem(apiItem: ApiItem): TreeNode {
  return {
    id: `item:${apiItem.id}`,
    name: apiItem.name,
    productId: apiItem.id,
  };
}

const fetchChildren = async (parentId: string): Promise<TreeNode[]> => {
  const response = await api.get<ApiResponse>(`/store/${parentId}`);
  const { nodes, items } = response.data;

  const folders = nodes.map(adaptApiNode);
  const products = items.map(adaptApiItem);

  // Сначала папки, потом товары
  return [...folders, ...products];
};

const fetchCheckItemsByProductId = async (productId: number): Promise<StoreCheckItem[]> => {
  const response = await api.get<StoreCheckItem[]>(`/store/products/${productId}`);

  return response.data;
}

export { fetchChildren, fetchCheckItemsByProductId };