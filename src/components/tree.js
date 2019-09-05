import React from 'react';
import TreeItem from './tree-item';
import {single} from "./single-expand-model";

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

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items }
  }
  
  render() {
    return (<ul className='mini-react-tree'>
              { buildItems(single((items) => { this.setState({ items: items }) }, this.props.items),
                           null,
                           this.props.items,
                           this.props.conf.items) }
            </ul>);
  }
}