import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';
import { single } from './components/single-expand-model.js';
import { multi } from './components/multi-expand-model.js';
import { children } from './components/children-model.js';

const items = [
  {
    name: 'item-1',
    items: [
      {
        name: 'subitem-1.1',
        items: [
          {
            name: 'subitem-1.1.1'
          }
        ]
      }
    ]
  },
  {
    name: 'item-2',
    items: [
      {
        name: 'subitem-2.1',
        items: [
          {
            name: 'subitem-2.1.1'
          }
        ]        
      }
    ]    
  }
];

const conf = {
  expandModel: multi,
  childrenModel: children(items),

  child: {
    title: 'name'
  }
};

ReactDOM.render((<Tree conf={ conf } />), document.getElementById('root'));