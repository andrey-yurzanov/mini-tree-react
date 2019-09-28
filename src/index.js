import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, defConf } from './components/tree';
import 'babel-polyfill';

const children = [
  {
    title: 'Item-1',
    children: [
      {
        title: 'Subitem-1-1'
      },
      {
        title: 'Subitem-1-2'
      }        
    ]
  },
  {
    title: 'Item-2',
    children: [
      {
        title: 'Subitem-2-1'
      },
      {
        title: 'Subitem-2-2'
      }         
    ]
  }
];
const conf = defConf(children);

const root = document.getElementById('root');
ReactDOM.render((<Tree conf={ conf } />), root);