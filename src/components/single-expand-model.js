// For single model processing
const singleEach = (items, expandItem) => {
	return items.map((item) => {
		if (expandItem._treeIndex == item._treeIndex) {
			item.expanded = !expandItem.expanded;
		}

		// If has children
		if (item.items) {
			item.items = singleEach(item.items, expandItem);
		}
		return item;
	});
};
// Single expand model
export const single = (render, items) => {
	return (expandItem, expandValue) => {
		items = singleEach(items, expandItem, expandValue);
		render.apply(items, [ items ]);
	};
};