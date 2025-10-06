import { api } from "./api"

export interface TreeNode {
  id: string;
  name: string;
  hasChildren: boolean;
  children?: TreeNode[];
}

function adaptApiNode(apiNode: any): TreeNode {
  return {
    id: String(apiNode.id),
    name: apiNode.name,
    hasChildren: !apiNode.isFinal,
    children: undefined,
  };
}

const fetchChildren = async (parentId: number): Promise<TreeNode[]> => {
  const response = await api.get<any[]>(`/goods/${parentId}`);
  return response.data.map(adaptApiNode);
};

export { fetchChildren };