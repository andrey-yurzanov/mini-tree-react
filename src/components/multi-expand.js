export const multi = (conf) => {
  return (item) => { 
    item.expanded = !item.expanded;
    return item;
  };
}; 