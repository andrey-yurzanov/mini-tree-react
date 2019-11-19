/**
 *  No selection
 *  @param conf tree configuration
 *  @return empty function
 *  @author Andrey Yurzanov
 */
export const none = (conf) => (item, select) => {};

/**
 *  For single selecting
 *  @param conf tree configuration
 *  @return function for single selection processing
 *  @author Andrey Yurzanov
 */
export const single = (conf) => {
  let items = new Map();
  return (item, select) => {
    if (items.size) {
      for (const prev of items.values()) {
        if (item._treeIndex !== prev.item._treeIndex && prev.item.selected) {
          prev.item.selected = false;
          prev.select.apply(prev, [ prev.item ]);
        }
      }
    }
    item.selected = !item.selected;
    select.apply(item, [ item ]);

    items.set(item._treeIndex, { item: item, select: select });
  };
};

/**
 *  For multi selecting
 *  @param conf tree configuration
 *  @return function for multi selection processing
 *  @author Andrey Yurzanov
 */
export const multi = (conf) => {
  return (item, select) => {
    item.selected = !item.selected;
    select.apply(item, [ item ]);
  };
};

/**
 *  Standard selection models
 *  @author Andrey Yurzanov
 */
export const SelectModels = { none: none, single: single, multi: multi };