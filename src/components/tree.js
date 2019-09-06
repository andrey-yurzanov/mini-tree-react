import React from 'react';
import TreeItem from './tree-item';

const buildItems = (expandModel, parent, items, conf) => {
  if (items) {
    return items.map((item, index) => {
      if (parent) {
        item._treeIndex = parent._treeIndex + index;
      } else {
        item._treeIndex = index + '';
      }
      return (<TreeItem expandModel={ expandModel }
                        parent={ parent }
                        item={ item }
                        index={ index } 
                        conf={ conf } 
                        buildItems={ buildItems } />);
    });
  }
};

const buildChildren = (parent, conf, expandModal, childrenModel) => {
  const children = childrenModel.apply(conf, [ parent, conf ]);
  return children.map((child, index) => {
    if (parent && parent._treeIndex) {
      child = child._treeIndex = parent._treeIndex + index;
    } else {
      child._treeIndex = index + '';
    }
    return null;
  });
};

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items }
  }
  
  render() {
    const conf = this.props.conf;
    const expandModel = conf.expandModel;
    const expand = expandModel.apply(expandModel, [ 
      (items) => this.setState({ items: items }), 
      this.props.items 
    ]);

    const childrenModel = conf.childrenModel;
    

    return (<ul className='mini-react-tree'>
              { buildItems(expand, null, this.props.items, conf.children) }
            </ul>);
  }
}