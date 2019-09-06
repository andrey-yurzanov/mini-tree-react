import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';
import { single } from './components/single-expand-model.js';
import { multi } from './components/multi-expand-model.js';

const conf = {
  expandModel: multi,
  children: {
    title: 'name',
    children: 'items'
  }
};

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

ReactDOM.render((<Tree conf={ conf } items={ items } />), document.getElementById('root'));