# mini-tree-react

Simple tree view realization for react.js

## Table of contents
* [Getting started](#getting-started)
  * [Install](#install)
  * [Base expample](#base-example)
* [Main Concepts](#main-concepts)
  * [Item content](#item-content)
  * [Expanding / Collapsing](#expand-collapse)
  * [Resolve children](#children-resolve)
  * [Listeners](#listeners)
  * [Full description of configuration](#full-config)

## Getting started

  ### Install
  For start using `mini-tree-react` you need install `mini-tree-react` package. Enter the command: `npm i mini-tree-react --save-dev`.

  ### Base example

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Tree, defConf } from 'mini-tree-react';

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
  ```

## Main concepts

  ### Item content
  Every item contains `icon`, `title` and `behavior`. By default using only `title` with value - 'title'. Example: 

  ### Expanding / Collapsing
  Tree items can be expanded and collapsed. At the same time, one tree item or all items can be expanded. This is determined by parameter `expand`. `mini-tree-react` provides two values for this parameter: `single` and `multi`. By default using `single` value. Also you can create self variant. Example:
  ```javascript
  import { Tree, defConf, single, multi } from 'mini-tree-react';
  // ...
  // `single` example
  const conf = defConf(children);
  conf.expand = single;
  // ...
  // `multi` example
  const conf = defConf(children);
  conf.expand = multi;
  // ... 
  // Self realization example
  const conf = defConf(children);
  conf.expand = (item, expand) => { /* your code */ }; 
  // ... 
  ```

  ### Resolve children
  `mini-tree-react` provides two ways for resolve children(tree data): `param` and `field`. Also you can create self variant. Example:
  ```javascript
  import { Tree, defConf, param, field } from 'mini-tree-react';
  // ...
  // `param` example
  const conf = defConf(children);
  conf.resolve = param([ /* content */ ]);
  // ...
  // `field` example
  const conf = defConf(children);
  conf.resolve = field();
  conf.children = [ /* content */ ];
  // ... 
  // Self realization example
  const conf = defConf(children);
  conf.resolve = (parent, childConf) => { /* your code */ };  
  // ...
  ```

  ### Listeners
  `mini-tree-react` provides three types listeners: `expand` - it is for to listen item expanding, `collapse` - it is for to listen item collapsing and `click` - it is for to listen click by item. Example:
  ```javascript
  import { Tree, defConf, param, field } from 'mini-tree-react';
  // ...
  // Listeners example
  const conf = defConf(children);
  conf.child.listen = {
    expand: (name, event) => { /* your code */ },
    collapse: (name, event) => { /* your code */ },
    click: (name, event) => { /* your code */ }
  };
  // ...
  ```