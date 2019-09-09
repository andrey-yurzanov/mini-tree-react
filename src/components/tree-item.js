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
// For <i> tag building
const i = (result) => {
  if (typeof result == 'string') {
    return (<i className={ result }></i>);
  }
  return result;
};
// For <span> tag building
const span = (result) => {
  if (typeof result == 'string') {
    return (<span className='mini-react-tree-item-title'>{ result }</span>);
  }
  return result;
};

/**
 *  Tree element realization
 *  @author Andrey Yurzanov 
 */
export default class TreeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: this.props.item }
  }

  render() {  
    const conf = this.props.conf;
    const item = this.props.item;
    const index = this.props.index;
    const expand = this.props.expand;
    const resolve = this.props.resolve;
    const onClick = () => this.setState({ item: expand.apply(conf, [ item ]) });
    return (<li className={ 'mini-react-tree-item' }>
              <div>
                <span className='mini-react-tree-item-behavior' onClick={ onClick }>
                  { i(build(item, index, conf, 'icon')) }
                  { span(build(item, index, conf, 'title')) }                
                </span>
                <ul className='mini-react-tree-items'>
                  { item.expanded ? this.props.buildChildren(item, conf, expand, resolve) : null }
                </ul>  
              </div> 
            </li>);
  }
}