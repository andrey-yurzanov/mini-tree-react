/**
 *  Default field name 
 */
export const RESOLVE_FIELD = 'children';

/**
 *  Resolve children by field
 *  @author Andrey Yurzanov
 */
export const field = () => (parent, childConf, resolve) => {
  if (childConf.children) {
    resolve.apply(childConf, [ parent[childConf.children] ]);
  } else {
    resolve.apply(childConf, [ parent[RESOLVE_FIELD] ]);
  }
};

/**
 *  Resolve children by param
 *  @author Andrey Yurzanov
 *  @param children tree children
 */
export const param = (children) => {
  return (parent, childConf, resolve) => {
    if (parent._treeIndex) {
      if (childConf && childConf.children) {
        resolve.apply(childConf, [ parent[childConf.children] ]);
      } else {
        resolve.apply(childConf, [ parent[RESOLVE_FIELD] ]);
      }
    } else {
      resolve.apply(childConf, [ children ]);
    }
  };
};

/**
 *  Standard models of resolving
 *  @author Andrey Yurzanov
 */
export const ResolveModels = { field: field, param: param };