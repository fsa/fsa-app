import { useState, useEffect, type SyntheticEvent } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress } from "@mui/material";
import { api } from "~/services/api";
import type { Route } from "./+types/goods";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Товары" },
    { name: "description", content: "Список товаров" },
  ];
}

interface TreeNode {
  id: string;
  name: string;
  hasChildren: boolean;
  children?: TreeNode[];
}

function adaptApiNode(apiNode: any): TreeNode {
  return {
    id: String(apiNode.id),
    name: apiNode.name,
    hasChildren: !apiNode.finally,
    children: undefined,
  };
}

async function fetchChildren(parentId: string | null): Promise<TreeNode[]> {
  const url = "/goods/" + (parentId ?? 0);
  const { data } = await api.get(url);
  return data.map(adaptApiNode);
}

export default function LazyTree() {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loadingNodes, setLoadingNodes] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Загружаем корневые элементы сразу
  useEffect(() => {
    void (async () => {
      if (nodes.length === 0) {
        const rootNodes = await fetchChildren(null);
        setNodes(rootNodes);
      }
    })();
  }, []);

  const handleExpansionChange = (event: SyntheticEvent | null, itemIds: string[]) => {
    setExpandedItems(itemIds);

    // Для каждого раскрытого элемента проверяем, нужно ли подгружать детей
    itemIds.forEach((nodeId) => {
      const findNode = (items: TreeNode[]): TreeNode | undefined => {
        for (const n of items) {
          if (n.id === nodeId) return n;
          if (n.children) {
            const found = findNode(n.children);
            if (found) return found;
          }
        }
        return undefined;
      };

      const node = findNode(nodes);
      if (!node || node.children || loadingNodes[nodeId]) return; // уже есть дети или загружается

      // Начинаем загрузку
      setLoadingNodes((p) => ({ ...p, [nodeId]: true }));

      void (async () => {
        try {
          const children = await fetchChildren(nodeId);

          setNodes((prev) => {
            const updateTree = (items: TreeNode[]): TreeNode[] =>
              items.map((n) =>
                n.id === nodeId
                  ? { ...n, children }
                  : { ...n, children: n.children ? updateTree(n.children) : n.children }
              );
            return updateTree(prev);
          });
        } finally {
          setLoadingNodes((p) => {
            const copy = { ...p };
            delete copy[nodeId];
            return copy;
          });
        }
      })();
    });
  };

  const renderTree = (node: TreeNode) => {
    const isLoading = loadingNodes[node.id];

    return (
      <TreeItem key={node.id} itemId={node.id} label={node.name}>
        {/* Дети */}
        {node.children?.map(renderTree)}

        {/* Если есть потенциальные дети, но ещё не загружены — добавляем placeholder */}
        {!node.children && node.hasChildren && !isLoading && (
          <TreeItem itemId={`${node.id}-placeholder`} label="" disabled />
        )}

        {/* Индикатор загрузки */}
        {isLoading && (
          <TreeItem itemId={`${node.id}-loading`} label={<CircularProgress size={16} />} disabled />
        )}
      </TreeItem>
    );
  };

  return (
    <SimpleTreeView
      slots={{
        collapseIcon: ExpandMoreIcon,
        expandIcon: ChevronRightIcon,
      }}
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpansionChange}
    >
      {nodes.map(renderTree)}
    </SimpleTreeView>
  );
}
