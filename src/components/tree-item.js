import React from 'react';

// For click handler building
const buildClick = (conf, select, hasChildren, item, owner) => {
  return () => {
    // Events sending
    if (conf.listen) {
      const event = {
        item: item,
        childConf: conf
      };

      // Click event
      call(conf.listen, 'click', event);
    }

    // Select/Unselect processing
    select.apply(conf, [ item, (item) => owner.setState({ item: item }) ]);
  };
};
// For double click handler building
const buildDoubleClick = (conf, expand, hasChildren, item, owner) => {
  return () => {
    // Events sending
    if (conf.listen) {
      const event = {
        item: item,
        childConf: conf
      };

      // Double click event
      call(conf.listen, 'dbclick', event);

      // Expand/Collapse events
      item.expanded ? call(conf.listen, 'collapse', event) :
                      call(conf.listen, 'expand', event);
    }

    // Expand/Collapse processing
    expand.apply(conf, [ item, (item) => owner.setState({ item: item }) ]);
  };
};
// For behavior building
const buildBehavior = (conf, item, index, hasChildren) => {
  const expandClass = item.expanded ? 'behaviorExpanded' : 'behaviorCollapsed';
  return hasChildren ?
    span(build(
      item,
      index,
      conf,
      expandClass
    ),
    'mini-tree-item-behavior-icon'
  ) : null;
};

// For item element building
const build = (item, index, conf, confName) => {
  const type = (typeof conf[confName]);
  if (type === 'string') {
    return item[conf[confName]];
  } else if (type === 'function') {
    return conf[confName].apply(conf, [ item, index, conf ]);
  }
  return null; 
};
// For <span> tag building
const span = (result, className) => {
  return (<span className={ className }>{ result }</span>);
};
// For listener calling
const call = (listenConf, name, event) => {
  let handle = null;
  const type = (typeof listenConf[name]);
  if (type === 'string') {
    handle = event.item[listenConf[name]];
  } else if (type === 'function') {
    handle = listenConf[name];
  }

  // If listener was found
  if (handle) {
    handle.apply(listenConf, [ name, event ]);
  }
};

/**
 *  Tree element realization
 *  @author Andrey Yurzanov 
 */
export default class TreeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: this.props.item };
  }

  render() {  
    const conf = this.props.conf;
    const item = this.props.item;
    const index = this.props.index;
    const expand = this.props.expand;
    const select = this.props.select;
    const resolve = this.props.resolve;

    const hasChildren = this.props.hasChildren(item, conf);
    const behavior = buildBehavior(conf, item, index, hasChildren);
    const click = buildClick(conf, select, hasChildren, item, this);
    const doubleClick = buildDoubleClick(conf, expand, hasChildren, item, this);
    return (<li key={ 'tree-item-key-' + item._treeIndex } className='mini-tree-item'>
              <React.Fragment>
                <span className={'mini-tree-item-behavior' + (item.selected ? ' selected' : '') }
                      onClick={ click }
                      onDoubleClick={ doubleClick }>
                    { span(build(item, index, conf, 'icon'), 'mini-tree-item-icon') }
                    { span(build(item, index, conf, 'title'), 'mini-tree-item-title') }
                    { behavior }                
                  </span>
                  <ul className='mini-tree-items'>
                    { item.expanded ? this.props.buildChildren(item, conf, expand, select, resolve) : null }
                  </ul>
              </React.Fragment>
            </li>);
  }
}