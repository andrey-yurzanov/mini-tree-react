import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';
import { field } from './components/field-resolve.js';
import { multi } from './components/multi-expand.js'; 
import { single } from './components/single-expand.js';

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
  expand: single,
  resolve: field,

  child: {
    icon: () => (<i className="fas fa-folder"></i>),
    title: 'name',
    children: 'items',
    behaviorExpanded: () => (<i className='far fa-minus-square'></i>),
    behaviorCollapsed: () => (<i className='far fa-plus-square'></i>)
  },

  items: items
};

ReactDOM.render((<Tree conf={ conf } />), document.getElementById('root'));