import React from 'react';

// For item element building
const build = (item, index, conf, confName) => {
  const type = (typeof conf[confName]);
  if (type == 'string' || type == 'number') {
    return item[conf[confName]];
  } else if (type == 'function') {
    return conf[confName].apply(conf, [ item, index, conf ]);
  }
  return null; 
};
// For <span> tag building
const span = (result, className) => {
  return (<span className={ className }>{ result }</span>);
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
    const resolve = this.props.resolve;
    const behavior = this.props.hasChildren(item, conf) ? 
                     span(build(item, index, conf, item.expanded ? 'behaviorExpanded' : 'behaviorCollapsed'), 'mini-react-tree-item-behavior-icon') : 
                     null;
    const click = () => expand.apply(conf, [ item, (item) => this.setState({ item: item }) ]);
    return (<li className='mini-react-tree-item'>
              <div>
                <span className='mini-react-tree-item-behavior' onClick={ click }>
                  { span(build(item, index, conf, 'icon'), 'mini-react-tree-item-icon') }
                  { span(build(item, index, conf, 'title'), 'mini-react-tree-item-title') }
                  { behavior }                
                </span>
                <ul className='mini-react-tree-items'>
                  { item.expanded ? this.props.buildChildren(item, conf, expand, resolve) : null }
                </ul>  
              </div> 
            </li>);
  }
}