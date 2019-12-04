import React from 'react';
import TreeItem from './tree-item';
import { param } from './resolve';
import { ExpandModels } from './expand';
import { SelectModels } from './select';

// For children building
const buildChildren = (treeConf, parent, children, conf, expand, select, resolve, methodsStore) => {
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
                      resolve={ resolve }
                      methodsStore={ methodsStore } />);
  });
};
// For trees storing
const treeMethodsStore = new Map();

/**
 *  Tree realization
 *  @author Andrey Yurzanov 
 */
export class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { children: null };
    this.methodsStore = new Map();

    this.updateChildren = this.updateChildren.bind(this);
    this.findChild = this.findChild.bind(this);
    this.hasChildren = this.hasChildren.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.mountMethodsStore = this.mountMethodsStore.bind(this);
    this.unmountMethodsStore = this.unmountMethodsStore.bind(this);
  }

  componentDidMount() {
    this.mountMethodsStore();
    const conf = this.props.conf;
    if (conf) {
      conf.resolve.apply(conf, [ conf, conf.child, this.updateChildren ]);
    }
  }
  componentWillUnmount() {
    this.unmountMethodsStore();
    this.methodsStore.clear();
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
            conf.resolve,
            this.methodsStore
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

  /**
   *  For child searching
   *  @param selector value for child searching
   *  @return found child or undefined
   */
  findChild(selector) {
    return this.methodsStore.get(selector);
  }

  /**
   *  Checking existence of children
   *  @return true if children exist, else false
   */
  hasChildren() {
    return (this.state.children != null && this.state.children.length != 0);
  }

  /**
   *  To get tree's children
   *  @return children or empty array
   */
  getChildren() {
    const children = this.state.children;
    const methods = this.methodsStore;
    if (children) {
      return children.map((child) => methods.get(child._treeIndex));
    }
    return [];
  }

  /**
   *  Mounting of methods
   */
  mountMethodsStore() {
    const conf = this.props.conf;
    if (conf && conf.id) {
      treeMethodsStore.set(conf.id, {
        findChild: this.findChild,
        hasChildren: this.hasChildren,
        getChildren: this.getChildren
      });
    }
  }

  /**
   *  Unmounting of methods
   */
  unmountMethodsStore() {
    const conf = this.props.conf;
    if (conf && conf.id) {
      treeMethodsStore.delete(conf.id);
    }
  }
}

/**
 *  For tree searching by id
 *  @param id tree's identifier
 *  @return found tree or undefined
 */
export const findTree = (id) => treeMethodsStore.get(id);

/**
 *  Default configuration
 *  @param id tree's identifier
 *  @param children tree's items
 *  @returns default tree configuration
 */
export const defConf = (id, children) => {
  return {
    id: id,
    expand: ExpandModels.multi,
    select: SelectModels.multi,
    resolve: param(children),
    child: {
      id: 'id',
      content: 'content'
    }
  };
};