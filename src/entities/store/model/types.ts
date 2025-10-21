export interface TreeNode {
  id: string;
  name: string;
  productId?: number;
  children?: TreeNode[];
}

export interface StoreCheckItem {
  id: number;
  datetime: string;
  name: string;
  price: number;
  quantity: number;
  sum: number;
  real_price: number | null;
  real_quantity: number | null;
}
