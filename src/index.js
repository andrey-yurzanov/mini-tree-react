import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';
import { param } from './components/resolve.js';
import { multi } from './components/multi-expand.js'; 
import { single } from './components/single-expand.js';

const children = [
  {
    name: 'item-1',
    children: [
      {
        name: 'subitem-1.1',
        children: [
          {
            name: 'subitem-1.1.1'
          }
        ]
      }
    ]
  },
  {
    name: 'item-2',
    children: [
      {
        name: 'subitem-2.1',
        children: [
          {
            name: 'subitem-2.1.1'
          }
        ]        
      }
    ]    
  }
];
const handle = (name, event) => { console.log(name); console.log(event); };
const conf = {
  expand: single,
  resolve: param(children),

  child: {
    icon: () => (<i className="fas fa-folder"></i>),
    title: 'name',
    behaviorExpanded: () => (<i className='far fa-minus-square'></i>),
    behaviorCollapsed: () => (<i className='far fa-plus-square'></i>),

    listen: {
      expand: handle,
      collapse: handle,
      click: handle
    }
  },
};

ReactDOM.render((<Tree conf={ conf } />), document.getElementById('root'));