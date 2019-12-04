/**
 *  No expanding
 *  @param conf tree configuration
 *  @return function without change expanding
 *  @author Andrey Yurzanov
 */
export const none = (conf) => (event, data, expand) => expand.apply(data, [ data.isExpanded ]);

/**
 *  For single expanding
 *  @param conf tree configuration
 *  @return function for single expanding
 *  @author Andrey Yurzanov 
 */
export const single = (conf) => {
  let items = new Map();
  return (event, data, expand) => {
    if (items.size) {
      for (const prev of items.values()) {
        const prevData = prev.data;
        if (!data.item._treeIndex.startsWith(prevData.item._treeIndex) && prevData.isExpanded) {
          prev.expand.apply(prevData.item, [ false ]);
        }
      }
    }
    expand.apply(data.item, [ !data.isExpanded ]);

    data.isExpanded = !data.isExpanded;
    items.set(data.item._treeIndex, { data: data, expand: expand });
  };
};

/**
 *  For multi expanding
 *  @param conf tree configuration
 *  @return function for multi expanding
 *  @author Andrey Yurzanov 
 */
export const multi = (conf) => (event, data, expand) => expand.apply(data, [ !data.isExpanded ]);

/**
 *  Standard models of expanding
 *  @author Andrey Yurzanov
 */
export const ExpandModels = { none: none, single: single, multi: multi };