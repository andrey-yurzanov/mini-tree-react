# mini-tree-react

Simple tree view realization for ReactJS

![npm](https://img.shields.io/npm/v/@andrey-yurzanov/mini-tree-react)
![npm bundle size](https://img.shields.io/bundlephobia/min/@andrey-yurzanov/mini-tree-react)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![GitHub last commit](https://img.shields.io/github/last-commit/andrey-yurzanov/mini-tree-react)

## Table of contents
* [Getting started](#getting-started)
  * [Install](#install)
  * [Base example](#base-example)
* [Tree configuration](#tree-configuration)
  * [Expand / Collapse](#expand-collapse)
  * [Selection / Unselection](#selection-unselection)
  * [Resolve children](#resolve-children)
  * [Global methods](#global-methods)
  * [Tree methods](#tree-methods)
* [Child configuration](#child-configuration)
  * [Listeners](#listeners)
  * [Children methods](#children-methods)
* [Styling](#styling)

## Getting started

### Install
  For start using `mini-tree-react` you need to install `mini-tree-react` package. Enter the command: `npm i mini-tree-react --save-dev`.

### Base example

  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Tree, defConf } from 'mini-tree-react';

  const children = [
    {
      content: 'Item-1',
      children: [
        {
          content: 'Subitem-1-1'
        },
        {
          content: 'Subitem-1-2'
        }        
      ]
    },
    {
      content: 'Item-2',
      children: [
        {
          content: 'Subitem-2-1'
        },
        {
          content: 'Subitem-2-2'
        }         
      ]
    }
  ];
  const conf = defConf('my-tree', children);

  const root = document.getElementById('root');
  ReactDOM.render((<Tree conf={ conf } />), root);
  ```
  
## Tree configuration

### Expand / Collapse
  You can expand and collapse child tree items by double-clicking. 
  `ExpandModels` contains several commonly used models:
  
  `ExpandModels.none` - without expand and collapse;
  
  `ExpandModels.single` - only one child can be expand;
  
  `ExpandModels.multi` - all children can be expand at the same time;
  
  Also you can define your own model of expand:
  ```javascript
  const myExpandModel = (conf) => (event, data, expand) => {
    expand.apply(data, [ /* true - expanded, false - collapsed */ ])
  };
  const conf = {
    expand: myExpandModel
  }; 
  ```
 
### Selection / Unselection
  You can select and unselect child tree items by mouse click.
  `SelectModels` contains several commonly used models:
  
  `SelectModels.none` - without selection and unselection;
  
  `SelectModels.single` - only one child can be select;
  
  `SelectModels.multi` - all children can be select at the same time;  
  
  Also you can define your own selection model:
  ```javascript
  const mySelectModel = (conf) => (event, data, select) => {
    select.apply(data, [ /* true - selected, false - unselected */ ])
  };
  const conf = {
    select: mySelectModel
  }; 
  ```  
  
### Resolve children
  To get tree's children you must use resolve model.
  `ResolveModels` contains several commonly used models:
  
  `ResolveModels.field` - Resolve children by field in tree's configuration;
  ```javascript
  const conf = {
    resolve: ResolveModels.field(),
    children: [ /* some children */ ],
    child: {
      children: 'children' // You can specify a field name for `ResolveModels.field`
    }
  };
  ```
  
  `ResolveModels.param` - Resolve children by parameter. This model uses by default in `defConf` function;
  ```javascript
  const conf = {
    resolve: ResolveModels.param([ /* Some children */ ]),
  };
  ```

  Also you can define your own model of resolve:
  ```javascript
  const myResolveModel = (parent, childConf, resolve) => {
    const children = [/* some children */];
    resolve.apply(childConf, [ children ]);
  };
  const conf = {
    resolve: myResolveModel
  };
  ```
  
### Global methods
  `mini-tree-react` has global methods:
  
  `defConf(id: string, children: array): object` - default configuration creating;
  
  Standard configuration looks like this:
  ```javascript
  const manualConf = {
    id: 'my-tree',
    expand: ExpandModels.multi,
    select: SelectModels.multi,
    resolve: param([ /* some children */ ]),
    child: {
      id: 'id',
      content: 'content'
    }
  };
  ```
  If you uses `defConf` function then, the above code can be replaced by this code:
  ```javascript
  const conf = defConf('my-tree', [ /* some children */ ]);
  ```  
    
  `findTree(id: string): object` - tree searching by identifier;
  
  After the tree is found, you can use the tree methods. See methods in the section [Tree methods](#tree-methods)
  ```javascript
  const tree = findTree('my-tree');
  ```  
  
### Tree methods
  Tree has methods:
  
  `findChild(selector: string): object` - for child searching by id or `treeIndex`.
  `treeIndex` is specified by the rule: the parent `treeIndex` plus the index of the item in the array.
  Below you can to see `treeIndex` example:
  ```
  item - 0
    item - 00
  item - 1
    item - 10
      item - 100
  ```
  Although `treeIndex` seems like a good option, it's better to use identifiers to search.
  After the tree's child is found, you can use the children methods. 
  See methods in the section [Children methods](#children-methods)
  ```javascript
  const tree = findTree('my-tree');
  // Searching by id
  let child = tree.findChild('my-item-id');
  // Searching by treeIndex
  child = tree.findChild('010');
  ```
  
  `hasChildren(): boolean` - for children existence checking;
  ```javascript
  const tree = findTree('my-tree');
  if (tree.hasChildren()) {
    /* some processing */
  }
  ```
  
  `getChildren(): array` - for to get children;
  ```javascript
   const tree = findTree('my-tree');
   const selectedChildren = tree.getChildren()
                                .map((child) => child.isSelected());
  ```

## Child configuration
  Tree's child configuration must contains `id` and `content` fields. 
  `id` field contains child's identifier, it's can be use for child searching.
  `content` field contains data for rendering. These fields can be `string` or `function` type.
   Via `string` type you can to describe field name into data of child.
   Via `function` type you can to return any data. 
   By default uses `string` type, where `id` value is **id** and `content` value is **content**. 
   
   Example with `string` type:
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Tree, defConf } from 'mini-tree-react';
  
  const children = [
    {
      id: 'my-item',
      content: 'My item',
    }
  ];
  const conf = defConf('my-tree', children);
  conf.child = {
    id: 'id',
    content: 'content'
  };

  const root = document.getElementById('root');
  ReactDOM.render((<Tree conf={ conf } />), root);
  ```

  Example with `function` type:
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Tree, defConf } from 'mini-tree-react';
  
  const children = [
    {
      id: 'my-item',
      content: 'My item',
    }
  ];
  const conf = defConf('my-tree', children);
  conf.child = {
    id: (data) => data.item.id,
    content: (data) => (<span>{ data.item.content }</span>)
  };

  const root = document.getElementById('root');
  ReactDOM.render((<Tree conf={ conf } />), root);
  ```  
  
### Listeners
  The children of the tree have events that you can to listen:
  
  `onClick` - for listen to the click event;
  
  `onDoubleClick` - for listen to the double click event;
  
  `onSelect` - for listen to the selection event;
  
  `onUnselect` - for listen to the unselection event;
  
  `onExpand` - for listen to expansion event;
  
  `onCollapse` - for listen to the collapse event;
  
  These fields can be `string` or `function` type. 
  Via `string` type you can to describe the function name into data of the child.
  Via `function` type you can describe the function being called.
  
  Example with `string` type:
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Tree, defConf } from 'mini-tree-react';

  const children = [
    {
      id: 'my-item',
      content: 'My item',
      click: (event, data) => { /* Some processing */ },
      doubleClick: (event, data) => { /* Some processing */ },
      select: (event, data) => { /* Some processing */ },
      unselect: (event, data) => { /* Some processing */ },
      expand: (event, data) => { /* Some processing */ },
      collapse: (event, data) => { /* Some processing */ }
    }
  ];
  const conf = defConf('my-tree', children);
  conf.child = {
    id: 'id',
    content: 'content',
    onClick: 'click',
    onDoubleClick: 'doubleClick',
    onSelect: 'select',
    onUnselect: 'unselect',
    onExpand: 'expand',
    onCollapse: 'collapse'
  };

  const root = document.getElementById('root');
  ReactDOM.render((<Tree conf={ conf } />), root);
  ```

  Example with `function` type:
  ```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Tree, defConf } from 'mini-tree-react';

  const children = [
    {
      id: 'my-item',
      content: 'My item',
    }
  ];
  const conf = defConf('my-tree', children);
  conf.child = {
    id: 'id',
    content: 'content',
    onClick: (event, data) => { /* Some processing */ },
    onDoubleClick: (event, data) => { /* Some processing */ },
    onSelect: (event, data) => { /* Some processing */ },
    onUnselect: (event, data) => { /* Some processing */ },
    onExpand: (event, data) => { /* Some processing */ },
    onCollapse: (event, data) => { /* Some processing */ }
  };

  const root = document.getElementById('root');
  ReactDOM.render((<Tree conf={ conf } />), root);
  ```  
  
### Children methods
  Children has methods:
  
  `toggleSelected(): void` - for select/unselect children;
  ```javascript
  const tree = findTree('my-tree');
  tree.findChild('my-item').toggleSelected();
  ```
  
  `toggleExpanded(): void` - for expand/collapse children;
  ```javascript
  const tree = findTree('my-tree');
  tree.findChild('my-item').toggleExpanded();    
  ```
  
  `hasChildren(): boolean` - for children existence checking;
  ```javascript
  const child = findTree('my-tree').findChild('my-item');
  if (child.hasChildren()) {
    /* some processing */
  }
  ```  
  
  `getChildren(): array` - for to get children;
  ```javascript
  const child = findTree('my-tree').findChild('my-item');
  // All children selecting
  child.getChildren()
       .forEach((child) => child.toggleSelected());
  ```
  
  `isSelected(): boolean` - for current selection value checking;
  ```javascript
   const child = findTree('my-tree').findChild('my-item');
   // To get all selected children
   const selectedChildren = child.getChildren()
                                 .map((child) => child.isSelected()); 
  ```
  
  `isExpanded(): boolean` - for current expansion value checking;
  ```javascript
   const child = findTree('my-tree').findChild('my-item');
   // To get all expanded children
   const selectedChildren = child.getChildren()
                                 .map((child) => child.isExpanded()); 
  ```  
  
  `getData(): object` - for to get child's data;
  ```javascript
   const child = findTree('my-tree').findChild('my-item');
   // To get data of child
   const data = child.getData(); 
  ```   
  
  `getParent(): object` - for to get parent;
  ```javascript
   // Expand all
   let child = findTree('my-tree').findChild('my-item');
   do {
     child.toggleExpanded();
     child = child.getParent();
   } while (child);
    
  ```    

  ## Styling
  Below you can see base description of `mini-tree-react` styles. 
  Use this description to simplify styling. 
  Also you can find this description in file: `mini-tree-react.css`, 
  it is can be load via `css-loader` and `style-loader`, 
  more information on [css-loader](https://webpack.js.org/loaders/css-loader/).
  ```css
  .mini-tree {
    padding: 0;
    list-style: none;
    margin-left: 25px;
    border-left: 0.5px solid #ccc;
  }
  .mini-tree-item-behavior {
    display: block;
    line-height: 14px;
    padding: 15px 0 15px 25px;
    cursor: default;
    white-space: nowrap;
  }
  .mini-tree-item-behavior:hover {
    color: rgb(99, 122, 156);
    cursor: pointer;
  }
  .mini-tree-item-behavior.selected {
    color: rgb(64, 116, 191);
  }
  .mini-tree-item {    
    overflow: hidden;
    position: relative;
  }
  .mini-tree-item:before {    
    top: 22px;
    width: 15px;
    content: ' ';
    position: absolute;
    display: inline-block;
    border: 0.5px solid #ccc;
  }
  .mini-tree-item-content {}
  .mini-tree-items {
    padding: 0;
    list-style: none;
    margin-left: 25px;
    border-left: 0.5px solid #ccc;
    display: none;
  }
  .mini-tree-items.expanded {
    display: inherit;
  }  
  ```