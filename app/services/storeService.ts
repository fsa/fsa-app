import { api } from "./api"

export interface TreeNode {
  id: string;
  name: string;
  productId?: number;
  children?: TreeNode[];
}

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

export interface StoreCheckItem {
  id: number;
  datetime: string;
  name: string;
  price: number;
  quantity: number;
  sum: number;
  real_price: number;
  real_quantity: number;
}

interface FnsCheck {
  id: number;
  datetime: string;
}

interface ApiStoreCheckItem {
  id: number;
  FnsCheck: FnsCheck;
  name: string;
  price: number;
  quantity: number;
  sum: number;
  real_price: number;
  real_quantity: number;
}

function adaptStoreItem(apiStoreCheckItem: ApiStoreCheckItem): StoreCheckItem {
  return {
    id: apiStoreCheckItem.id,
    datetime: apiStoreCheckItem.FnsCheck.datetime,
    name: apiStoreCheckItem.name,
    price: apiStoreCheckItem.price/100,
    quantity: apiStoreCheckItem.quantity,
    sum: apiStoreCheckItem.sum/100,
    real_price: apiStoreCheckItem.real_price/100,
    real_quantity: apiStoreCheckItem.real_quantity,
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
  const response = await api.get<ApiStoreCheckItem[]>(`/store/products/${productId}`);

  return response.data.map(adaptStoreItem);
}

export { fetchChildren, fetchCheckItemsByProductId };