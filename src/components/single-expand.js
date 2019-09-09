export const single = (conf) => {
  let prev= null;
  return (item) => {
    if (prev) {
      if (!item._treeIndex.startsWith(prev._treeIndex)) {
        prev.expanded = false;
      }
    }
    item.expanded = !item.expanded;
    prev = item;
  };
};