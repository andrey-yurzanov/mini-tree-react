import React from 'react';
import TreeItem from './tree-item';

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

      return (<TreeItem parent={ parent }
                        item={ child }
                        index={ index }
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
export default class Tree extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const conf = this.props.conf;
    return (<ul className='mini-react-tree'>
              { buildChildren(
                  conf, 
                  conf.child,
                  conf.expand.apply(conf, [ conf ]),                    
                  conf.resolve
                ) }
            </ul>);
  }
}