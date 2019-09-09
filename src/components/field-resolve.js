export const RESOLVE_FIELD = 'children';

export const fieldResolve = (parent, childConf) => {
  if (childConf.children) {
    return parent[childConf.children];
  }
  return parent[RESOLVE_FIELD];
};