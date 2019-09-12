/**
 *  Default field name 
 */
export const RESOLVE_FIELD = 'children';

/**
 *  Resolve children by field
 *  @author Andrey Yurzanov
 *  @param parent object who contains children field
 *  @param childConf tree child configuration
 */
export const field = (parent, childConf) => {
  if (childConf.children) {
    return parent[childConf.children];
  }
  return parent[RESOLVE_FIELD];
};

/**
 *  Resolve children by param
 *  @author Andrey Yurzanov
 *  @param children tree children
 */
export const param = (children) => {
  return (parent, childConf) => {
    if (parent._treeIndex) {
      if (childConf.children) {
        return parent[childConf.children];
      }
      return parent[RESOLVE_FIELD]; 
    }
    return children;
  };
};