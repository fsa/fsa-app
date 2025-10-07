import { type SyntheticEvent, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress, IconButton, Stack, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import type { TreeNode } from "~/services/storeService";
import { useStoreTree } from "~/hooks/useStoreTree";

function TreeNodeComponent({
  node,
  expandedItems,
}: {
  node: TreeNode;
  expandedItems: string[];
}) {
  const theme = useTheme();
  const isExpanded = expandedItems.includes(node.id);
  const query = useStoreTree(node.id, isExpanded);

  const isFolder = node.hasChildren;
  const iconColor = theme.palette.primary.light;

  return (
    <TreeItem
      itemId={String(node.id)}
      label={
        <Stack direction="row" spacing={1.4} alignItems="center">
          {isFolder ? (
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.div
                  key="open"
                  initial={{ rotate: -15, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 15, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FolderOpenIcon fontSize="large" sx={{ color: iconColor }} />
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ rotate: 15, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -15, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FolderIcon fontSize="large" sx={{ color: iconColor }} />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <ShoppingCartOutlined
              fontSize="large"
              sx={{ color: theme.palette.text.secondary }}
            />
          )}
          <span>{node.name}</span>
          {!node.hasChildren && (
            <IconButton
              size="large"
              onClick={(e) => {
                e.stopPropagation();
              }}
              sx={{
                opacity: 0.7,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 1 },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      }
    >
      {query.data?.map((childNode) => (
        <TreeNodeComponent
          key={childNode.id}
          node={childNode}
          expandedItems={expandedItems}
        />
      ))}
      {query.isLoading && (
        <TreeItem
          itemId={`${node.id}-loading`}
          label={<CircularProgress size={16} />}
          disabled
        />
      )}
      {!query.data && isFolder && !query.isLoading && (
        <TreeItem itemId={`${node.id}-placeholder`} label="" disabled />
      )}
      {query.data?.length==0 && isFolder && !query.isLoading && (
        <TreeItem itemId={`${node.id}-empty`} label="Пусто" disabled />
      )}
    </TreeItem>
  );
}

export default function StoreTree() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const rootQuery = useStoreTree('0', true);

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
