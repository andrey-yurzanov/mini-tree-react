import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, defConf } from './components/tree.js';
import { param } from './components/resolve.js';
import { multi } from './components/expand.js'; 
import { single } from './components/expand.js';
import 'babel-polyfill';

const createChildren = (count, depth) => {
  if (depth > 0) {
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push({
        title: 'item-' + depth + '-' + i,
        children: createChildren(count, depth - 1)     
      });
    }
    return children;
  }
};
const conf = defConf(createChildren(2, 2));

ReactDOM.render((<Tree conf={ conf } />), document.getElementById('root'));