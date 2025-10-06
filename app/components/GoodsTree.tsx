import { type SyntheticEvent, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress } from "@mui/material";
import type { TreeNode } from "~/services/goodsService";
import { useGoodsTree } from "~/hooks/useGoodsTree";

function TreeNodeComponent({
  node,
  expandedItems,
}: {
  node: TreeNode;
  expandedItems: string[];
}) {
  const isExpanded = expandedItems.includes(node.id);
  const query = useGoodsTree(Number(node.id), isExpanded);

  return (
    <TreeItem itemId={String(node.id)} label={node.name}>
      {/* Загруженные дети */}
      {isExpanded &&
        query.data?.map((childNode) => (
          <TreeNodeComponent
            key={childNode.id}
            node={childNode}
            expandedItems={expandedItems}
          />
        ))}

      {/* Индикатор загрузки */}
      {query.isLoading && (
        <TreeItem
          itemId={`${node.id}-loading`}
          label={<CircularProgress size={16} />}
          disabled
        />
      )}

      {/* Плейсхолдер, если есть дети, но запрос ещё не запускался */}
      {!query.data && node.hasChildren && !query.isLoading && (
        <TreeItem itemId={`${node.id}-placeholder`} label="" disabled />
      )}
    </TreeItem>
  );
}

export default function GoodsTree() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const rootQuery = useGoodsTree(0, true);

  const handleExpansionChange = (
    event: SyntheticEvent | null,
    itemIds: string[],
  ) => {
    setExpandedItems(itemIds);
  };

  if (rootQuery.isLoading) {
    return <CircularProgress />;
  }

  return (
    <SimpleTreeView
      slots={{
        collapseIcon: ExpandMoreIcon,
        expandIcon: ChevronRightIcon,
      }}
      expandedItems={expandedItems}
      onExpandedItemsChange={handleExpansionChange}
    >
      {rootQuery.data?.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          expandedItems={expandedItems}
        />
      ))}
    </SimpleTreeView>
  );
}
