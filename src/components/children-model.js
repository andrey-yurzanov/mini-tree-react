export const children = (items) => {
  return (parent, conf) => {
    const type = (typeof items);
    if (type == 'string' | type == 'number') {
      return parent[items];
    } else if (type == 'function') {
      return items.apply(conf, [ parent, conf ]);
    }
    return items;
  };
};