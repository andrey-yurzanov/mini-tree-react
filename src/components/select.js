/**
 *  No selection
 *  @param conf tree configuration
 *  @return function without change selection
 *  @author Andrey Yurzanov
 */
export const none = (conf) => (event, data, select) => select.apply(data, [ data.isSelected ]);

/**
 *  For single selecting
 *  @param conf tree configuration
 *  @return function for single selection processing
 *  @author Andrey Yurzanov
 */
export const single = (conf) => {
  let items = new Map();
  return (event, data, select) => {
    if (items.size) {
      for (const prev of items.values()) {
        const prevData = prev.data;
        if (data.item._treeIndex !== prevData.item._treeIndex && prevData.isSelected) {
          prev.select.apply(prev, [ false ]);
        }
      }
    }
    select.apply(data.item, [ !data.isSelected ]);

    data.isSelected = !data.isSelected;
    items.set(data.item._treeIndex, { data: data, select: select });
  };
};

/**
 *  For multi selecting
 *  @param conf tree configuration
 *  @return function for multi selection processing
 *  @author Andrey Yurzanov
 */
export const multi = (conf) => (event, data, select) => select.apply(data, [ !data.isSelected ]);

/**
 *  Standard selection models
 *  @author Andrey Yurzanov
 */
export const SelectModels = { none: none, single: single, multi: multi };