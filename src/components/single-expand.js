/**
 *  For single expanding
 *  @param conf tree configuration
 *  @author Andrey yurzanov 
 */
export const single = (conf) => {
  let items = [];
  return (item, expand) => {
    if (items.length) {
      for (const prev of items) {
        if (!item._treeIndex.startsWith(prev.item._treeIndex) && prev.item.expanded) {
          prev.item.expanded = false;
          prev.expand.apply(prev, [ prev.item ]);
        }
      }
    }
    item.expanded = !item.expanded;
    expand.apply(item, [ item ]);

    items.push({ item: item, expand: expand }); 
  };
};