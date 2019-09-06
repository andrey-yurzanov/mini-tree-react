// For multi model processing
const multiEach = (items, expandItem) => {
	return items.map((item) => {
		if (expandItem._treeIndex == item._treeIndex) {
			item.expanded = !expandItem.expanded;
		}

		// If has children
		if (item.items) {
			item.items = multiEach(item.items, expandItem);
		}
		return item;
	});
};
/**
 *  Multi expand model
 *	@param treeUpdater callback for tree updating
 *  @param items all tree's items
 */
export const multi = (treeUpdater, items) => {
	return (expandItem, expandValue) => {
		items = multiEach(items, expandItem, expandValue);
		treeUpdater.apply(items, [ items ]);
	};
};