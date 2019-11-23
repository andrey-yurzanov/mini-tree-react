import React from 'react';
import TreeItem from './tree-item';
import { param } from './resolve';
import { ExpandModels } from './expand';
import { SelectModels } from './select';

// For children building
const buildChildren = (treeConf, parent, children, conf, expand, select, resolve) => {
  return children.map((child, index) => {
    if (parent && parent._treeIndex) {
      child._treeIndex = parent._treeIndex + index;
    } else {
      child._treeIndex = index + '';
    }

    return (<TreeItem key={ 'tree-item-' + child._treeIndex }
                      treeConf={ treeConf }
                      parent={ parent }
                      item={ child }
                      index={ index }
                      buildChildren={ buildChildren }
                      conf={ conf }
                      expand={ expand }
                      select={ select }
                      resolve={ resolve } />);
  });
};

/**
 *  Tree realization
 *  @author Andrey Yurzanov 
 */
export class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { children: null };
    this.updateChildren = this.updateChildren.bind(this);
  }

  componentDidMount() {
    const conf = this.props.conf;
    if (conf) {
      conf.resolve.apply(conf, [ conf, conf.child, this.updateChildren ]);
    }
  }

  render() {
    const conf = this.props.conf;
    if (conf) {
      const children = this.state.children;
      if (children) {
        return (<ul className='mini-tree'>
          { buildChildren(
            conf,
            conf,
            children,
            conf.child,
            conf.expand.apply(conf, [ conf ]),
            conf.select.apply(conf, [ conf ]),
            conf.resolve
          ) }
        </ul>);
      }
    }
    return (<ul className='mini-tree' />);
  }

  /**
   *  For children updating.
   *  @param children new children
   */
  updateChildren(children) {
    this.setState({ children: children });
  }
}

/**
 *  Default configuration
 *  @param children tree's items
 *  @returns default tree configuration
 */
export const defConf = (children) => {
  return {
    expand: ExpandModels.multi,
    select: SelectModels.none,
    resolve: param(children),
    child: {
      content: 'title'
    }
  };
};