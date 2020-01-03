/**
 *  Reasons of state update.
 *  @author Andrey Yurzanov
 */
export const UpdateStateType = {
  TREE_INIT: 0,
  ITEM_INIT: 1,
  ITEM_EXPANDED: 2,
  ITEM_SELECTED: 3,
  TREE_RESOLVED: 4,
  ITEM_RESOLVED: 5
};

/**
 *  State filter for selection value changing.
 *  @param state state for filtering
 *  @param selected selection value
 *  @return state after filtering
 *  @author Andrey Yurzanov
 */
export const toggleSelected = (state, selected) => {
  return { ...state, selected: selected };
};

/**
 *  State filter for expand value changing.
 *  @param state state for filtering
 *  @param expanded expand value
 *  @return state after filtering
 *  @author Andrey Yurzanov
 */
export const toggleExpanded = (state, expanded) => {
  return { ...state, expanded: expanded };
};