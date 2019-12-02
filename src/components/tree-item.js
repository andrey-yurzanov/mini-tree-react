import React from 'react';

// For data building
const data = (props, state) => {
  return {
    treeConf: props.treeConf,
    childConf: props.conf,
    parent: props.parent,
    item: props.item,
    hasChildren: (state.children != null && state.children.length != 0),
    isSelected: state.selected,
    isExpanded: state.expanded
  };
};
// For property extracting
const get = (data, name) => {
  const conf = data.childConf;
  const type = (typeof conf[name]);
  if (type === 'string') {
    return data.item[conf[name]];
  } else if (type === 'function') {
    return conf[name].apply(conf, [ data ]);
  }
  return null;
};

/**
 *  Tree element realization
 *  @author Andrey Yurzanov 
 */
export default class TreeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      expanded: false,
      children: null
    };

    this.hasChildren = this.hasChildren.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.updateSelectedByClick = this.updateSelectedByClick.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.updateExpandedByDblClick = this.updateExpandedByDblClick.bind(this);
    this.mountMethodsStore = this.mountMethodsStore.bind(this);
    this.unmountMethodsStore = this.unmountMethodsStore.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.isExpanded = this.isExpanded.bind(this);
    this.getData = this.getData.bind(this);
    this.getParent = this.getParent.bind(this);
  }

  componentDidMount() {
    this.mountMethodsStore();

    const conf = this.props.conf;
    const item = this.props.item;
    if (conf && item) {
      this.props.resolve.apply(conf, [ item, conf, this.updateChildren ]);
    }
  }
  componentWillUnmount() {
    this.unmountMethodsStore();
  }

  render() {
    const conf = this.props.conf;
    const item = this.props.item;
    const expand = this.props.expand;
    const select = this.props.select;

    let childrenList = null;
    const children = this.state.children;
    if (children) {
      childrenList = this.props.buildChildren(
        this.props.treeConf,
        item,
        children,
        conf,
        expand,
        select,
        this.props.resolve,
        this.props.methodsStore
      );
    }
    return (<li key={ 'tree-item-key-' + item._treeIndex } className='mini-tree-item'>
              <React.Fragment>
                <span className={'mini-tree-item-behavior' + (this.state.selected ? ' selected' : '') }
                      onClick={ this.updateSelectedByClick }
                      onDoubleClick={ this.updateExpandedByDblClick }>
                  <span className='mini-tree-item-content'>
                    { get(data(this.props, this.state), 'content') }
                  </span>
                </span>
                  <ul className={ 'mini-tree-items' + (this.state.expanded ? ' expanded' : '') }>
                    { childrenList }
                  </ul>
              </React.Fragment>
            </li>);
  }

  /**
   *  For children updating.
   *  @param children new children
   */
  updateChildren(children) {
    this.setState({
      selected: this.state.selected,
      expanded: this.state.expanded,
      children: children
    });
  }

  /**
   *  For selection value updating
   */
  toggleSelected() {
    const conf = this.props.conf;
    const select = this.props.select;
    const callback = (selected) => {
      if (this.state.selected !== selected) {
        this.setState({
          selected: selected,
          expanded: this.state.expanded,
          children: this.state.children
        });
        this.sendEvent(selected ? 'onSelect' : 'onUnselect', null);
      }
    };
    select.apply(conf, [ null, data(this.props, this.state), callback ]);
  }

  /**
   *  For selection value updating by click
   *  @param event click event
   */
  updateSelectedByClick(event) {
    const conf = this.props.conf;
    const select = this.props.select;
    const callback = (selected) => {
      this.sendEvent('onClick', event.nativeEvent);
      if (this.state.selected !== selected) {
        this.setState({
          selected: selected,
          expanded: this.state.expanded,
          children: this.state.children
        });
        this.sendEvent(selected ? 'onSelect' : 'onUnselect', event.nativeEvent);
      }
    };
    select.apply(conf, [ event.nativeEvent, data(this.props, this.state), callback ]);
  }

  /**
   *  For expand value updating
   */
  toggleExpanded() {
    const conf = this.props.conf;
    const expand = this.props.expand;
    const callback = (expanded) => {
      if (this.state.expanded !== expanded) {
        this.setState({
          selected: this.state.selected,
          expanded: expanded,
          children: this.state.children
        });
        this.sendEvent(expanded ? 'onExpand' : 'onCollapse', null);
      }
    };
    expand.apply(conf, [ null, data(this.props, this.state), callback ]);
  }

  /**
   *  For expand value updating by double click
   *  @param event double click event
   */
  updateExpandedByDblClick(event) {
    const conf = this.props.conf;
    const expand = this.props.expand;
    const callback = (expanded) => {
      this.sendEvent('onDoubleClick', event.nativeEvent);
      if (this.state.expanded !== expanded) {
        this.setState({
          selected: this.state.selected,
          expanded: expanded,
          children: this.state.children
        });
        this.sendEvent(expanded ? 'onExpand' : 'onCollapse', event.nativeEvent);
      }
    };
    expand.apply(conf, [ event.nativeEvent, data(this.props, this.state), callback ]);
  }

  /**
   *  Selection checking
   *  @return true if item is selected else false
   */
  isSelected() {
    return this.state.selected;
  }

  /**
   *  Expand checking
   *  @return true if item is expanded else false
   */
  isExpanded() {
    return this.state.expanded;
  }

  /**
   *  Checking existence of children
   *  @return true if children exist, else false
   */
  hasChildren() {
    return (this.state.children != null && this.state.children.length != 0);
  }

  /**
   *  To get item's children
   *  @return children or empty array
   */
  getChildren() {
    const children = this.state.children;
    const methods = this.props.methodsStore;
    if (children) {
      return children.map((child) => methods.get(child._treeIndex));
    }
    return [];
  }

  /**
   *  To get item's data
   *  @return item's data
   */
  getData() {
    return this.props.item;
  }

  /**
   *  To get item's parent
   *  @return item's parent
   */
  getParent() {
    const index = this.props.parent._treeIndex;
    if (index) {
      return this.props.methodsStore.get(index);
    }
  }

  /**
   *  Mounting of methods
   */
  mountMethodsStore() {
    const id = get(data(this.props, this.state), 'id');
    const methods = {
      toggleSelected: this.toggleSelected,
      toggleExpanded: this.toggleExpanded,
      hasChildren: this.hasChildren,
      getChildren: this.getChildren,
      isSelected: this.isSelected,
      isExpanded: this.isExpanded,
      getData: this.getData,
      getParent: this.getParent
    };

    if (id) {
      this.props.methodsStore.set(id, methods);
    }
    this.props.methodsStore.set(this.props.item._treeIndex, methods);
  }

  /**
   *  Unmounting of methods
   */
  unmountMethodsStore() {
    const id = get(data(this.props, this.state), 'id');
    if (id) {
      this.props.methodsStore.delete(id);
    }
    this.props.methodsStore.delete(this.props.item._treeIndex);
  }

  /**
   *  For events sending
   *  @param name event name
   *  @param event native event
   */
  sendEvent(name, event) {
    const conf = this.props.conf;
    const listen = conf.listen;
    if (listen) {
      const item = this.props.item;
      const data = this.props.methodsStore.get(item._treeIndex);
      const type = (typeof listen[name]);
      if (type === 'string') {
        item[listen[name]].apply(conf, [ event, data ]);
      } else if (type === 'function') {
        listen[name].apply(conf, [ event, data ]);
      }
    }
  }
}