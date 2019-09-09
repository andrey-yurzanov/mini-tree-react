import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';
import { fieldResolve } from './components/field-resolve.js';
import { multi } from './components/multi-expand.js'; 

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
  expand: multi,
  resolve: fieldResolve,

  child: {
    title: 'name',
    children: 'items'
  },

  items: items
};

ReactDOM.render((<Tree conf={ conf } />), document.getElementById('root'));