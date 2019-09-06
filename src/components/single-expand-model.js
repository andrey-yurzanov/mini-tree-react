// For single model processing
const singleEach = (items, expandItem) => {
	return items.map((item) => {
		if (expandItem._treeIndex == item._treeIndex) {
			item.expanded = !expandItem.expanded;
		} else if (!expandItem._treeIndex.startsWith(item._treeIndex)) {
			item.expanded = false;
		}

		// If has children
		if (item.items) {
			item.items = singleEach(item.items, expandItem);
		}
		return item;
	});
};
/**
 *  Single expand model
 *	@param treeUpdater callback for tree updating
 *  @param items all tree's items
 */
export const single = (treeUpdater, items) => {
	return (expandItem, expandValue) => {
		items = singleEach(items, expandItem, expandValue);
		treeUpdater.apply(items, [ items ]);
	};
};