/**
 *  For multi expanding
 *  @param conf tree configuration
 *  @author Andrey Yurzanov 
 */
export const multi = (conf) => {
  return (item, expand) => { 
    item.expanded = !item.expanded;
    expand.apply(item, [ item ]);    
  };
}; 