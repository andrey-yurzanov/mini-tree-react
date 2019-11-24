import React from 'react';

// For events sending
const sendEvent = (name, event, data) => {
  const listen = data.childConf.listen;
  if (listen) {
    const type = (typeof listen[name]);
    if (type === 'string') {
      data.item[listen[name]].apply(data.childConf, [ event, data ]);
    } else if (type === 'function') {
      listen[name].apply(data.childConf, [ event, data ]);
    }
  }
};
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

    this.updateChildren = this.updateChildren.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.updateExpanded = this.updateExpanded.bind(this);
    this.updateMethodsStore = this.updateMethodsStore.bind(this);
    this.hasChildren = this.hasChildren.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.isExpanded = this.isExpanded.bind(this);

    this.updateMethodsStore();
  }

  componentDidMount() {
    const conf = this.props.conf;
    const item = this.props.item;
    if (conf && item) {
      this.props.resolve.apply(conf, [ item, conf, this.updateChildren ]);
    }
  }

  render() {
    const conf = this.props.conf;
    const item = this.props.item;
    const expand = this.props.expand;
    const select = this.props.select;

    let childrenList = null;
    const children = this.state.children;
    if (children && this.state.expanded) {
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

    // Click handler building
    const click = (event) => {
      const callback = (selected) => {
        sendEvent('onClick', event.nativeEvent, data(this.props, this.state));
        this.updateSelected(selected);
      };
      select.apply(conf, [ event.nativeEvent, data(this.props, this.state), callback ]);
    };
    // Double click handler building
    const dblClick = (event) => {
      const callback = (expanded) => {
        sendEvent('onDoubleClick', event.nativeEvent, data(this.props, this.state));
        this.updateExpanded(expanded);
      };
      expand.apply(conf, [ event.nativeEvent, data(this.props, this.state), callback ]);
    };
    return (<li key={ 'tree-item-key-' + item._treeIndex } className='mini-tree-item'>
              <React.Fragment>
                <span className={'mini-tree-item-behavior' + (this.state.selected ? ' selected' : '') }
                      onClick={ click }
                      onDoubleClick={ dblClick }>
                  <span className='mini-tree-item-content'>
                    { get(data(this.props, this.state), 'content') }
                  </span>
                </span>
                  <ul className='mini-tree-items'>
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
   *  For selection value updating.
   *  @param selected new value
   */
  updateSelected(selected) {
    this.setState({
      selected: selected,
      expanded: this.state.expanded,
      children: this.state.children
    });
  }

  /**
   *  For expand value updating.
   *  @param expanded new value
   */
  updateExpanded(expanded) {
    this.setState({
      selected: this.state.selected,
      expanded: expanded,
      children: this.state.children
    });
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
   *  For methods updating
   */
  updateMethodsStore() {
    const id = get(data(this.props, this.state), 'id');
    const methods = {
      setChildren: this.updateChildren,
      setSelected: this.updateSelected,
      setExpanded: this.updateExpanded,
      hasChildren: this.hasChildren,
      isSelected: this.isSelected,
      isExpanded: this.isExpanded
    };

    if (id) {
      this.props.methodsStore.set(id, methods);
    }
    this.props.methodsStore.set(this.props.item._treeIndex, methods);
  }
}