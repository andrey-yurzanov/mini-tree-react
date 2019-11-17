import React from 'react';
import TreeItem from './tree-item';
import { param } from './resolve';
import { single } from './expand.js';

// For children building
const buildChildren = (parent, conf, expand, resolve) => {
  const children = resolve.apply(conf, [ parent, conf ]);
  if (children) {
    return children.map((child, index) => {
      if (parent && parent._treeIndex) {
        child._treeIndex = parent._treeIndex + index;
      } else {
        child._treeIndex = index + '';
      }

      return (<TreeItem key={ 'tree-item-' + child._treeIndex } 
                        parent={ parent }
                        item={ child }
                        index={ index }
                        hasChildren={ (item) => resolve.apply(conf, [ item, conf ]) }
                        buildChildren={ buildChildren }
                        conf={ conf }
                        expand={ expand }
                        resolve={ resolve } />);
    });
  }
  return [];
};

/**
 *  Tree realization
 *  @author Andrey Yurzanov 
 */
export class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { conf: this.props.conf };

    this.updateConf = this.updateConf.bind(this);
  }

  render() {
    const conf = this.props.conf;
    if (conf) {
      conf._updateConf = this.updateConf;
      return (<ul className='mini-tree'>
        { buildChildren(
          conf,
          conf.child,
          conf.expand.apply(conf, [ conf ]),
          conf.resolve
        ) }
      </ul>);
    }
    return (<ul className='mini-tree' />);
  }

  /**
   *  For configuration updating
   *  @param newConf new configuration
   */
  updateConf(newConf) {
    this.setState({ conf: newConf });
  }
}

/**
 *  Tree configuration updating
 *  @param treeConf current tree configuration
 *  @param newTreeConf new tree configuration
 */
export const updateTreeConf = (treeConf, newTreeConf) => treeConf._updateConf(newTreeConf);

/**
 *  Default configuration
 *  @param children tree's items
 *  @returns default tree configuration
 */
export const defConf = (children) => {
  return {
    expand: single,
    resolve: param(children),
    child: {
      title: 'title'
    }
  };
};