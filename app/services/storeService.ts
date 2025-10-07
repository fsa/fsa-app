import { api } from "./api"

export interface TreeNode {
  id: string;
  name: string;
  hasChildren: boolean;
  children?: TreeNode[];
}

function adaptApiNode(apiNode: any): TreeNode {
  return {
    id: apiNode.path,
    name: apiNode.name,
    hasChildren: true,
    children: undefined,
  };
}

const fetchChildren = async (parentId: string): Promise<TreeNode[]> => {
  const response = await api.get<any[]>(`/store/${parentId}`);
  return response.data.map(adaptApiNode);
};

export { fetchChildren };