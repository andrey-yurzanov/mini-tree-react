/**
 *  For single expanding
 *  @param conf tree configuration
 *  @author Andrey Yurzanov 
 */
export const single = (conf) => {
  let items = new Map();
  return (item, expand) => {
    if (items.size) {
      for (const prev of items.values()) {        
        if (!item._treeIndex.startsWith(prev.item._treeIndex) && prev.item.expanded) {
          prev.item.expanded = false;
          prev.expand.apply(prev, [ prev.item ]);
        }
      }
    }
    item.expanded = !item.expanded;
    expand.apply(item, [ item ]);

    items.set(item._treeIndex, { item: item, expand: expand }); 
  };
};

/**
 *  For multi expanding
 *  @param conf tree configuration
 *  @author Andrey Yurzanov 
 */
export const multi = (conf) => {
  return (item, expand) => {
    item.expanded = !item.expanded;
    expand.apply(item, [ item ]);    
  };
}; 