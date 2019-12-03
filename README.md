# mini-tree-react

Simple tree view realization for react.js

## Table of contents
* [Getting started](#getting-started)
  * [Install](#install)
  * [Base example](#base-example)
* [Tree configuration](#tree-configuration)
  * [Tree methods](#tree-methods)
* [Child configuration](#child-configuration)
  * [Listeners](#listeners)
  * [Children methods](#children-methods)
  * [Expanding / Collapsing](#expand-collapse)
  * [Resolve children](#children-resolve)
  * [Listeners](#listeners)
  * [Full description of configuration](#full-config)
* [Styling](#styling)
  * [Available classes](#available-classes)
  * [Base styles](#base-styles)

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
  
  ### Global methods
  `mini-tree-react` has global methods:
  
  `defConf(id: string, children: array): object` -
    
  `findTree(id: string): object` - 
  
  ### Tree methods
  Tree has methods:
  
  `findChild(selector: string): object` - 
  
  `hasChildren(): boolean` - 
  
  `getChildren(): array` - 

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
  
  `toggleExpanded(): void` - for expand/collapse children;
  
  `hasChildren(): boolean` - for children existence checking;
  
  `getChildren(): array` - for to get children;
  
  `isSelected(): boolean` - for current selection value checking;
  
  `isExpanded(): boolean` - for current expansion value checking;
  
  `getData(): object` - for to get child's data;
  
  `getParent(): object` - for to get parent;
   
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

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
  `mini-tree-react` provides two ways for resolve children(tree data): `param` - it is for resolve by `defConf` function parameter and `field` - it is for resolve by configuration field. Also you can create self variant. Example:
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
  `mini-tree-react` provides three types listeners: `expand` - it is for to listen item expanding, `collapse` - it is for to listen item collapsing and `click` - it is for to listen click by item. Listener configuration can be of types `string` or `function`. Example:
  ```javascript
  import { Tree, defConf } from 'mini-tree-react';  
  const children = [
    {
      icon: (<i className='my-icon-class'></i>),
      title: 'First item',
      expandedIcon: (<i className='my-icon-class'></i>),
      collapsedIcon: (<i className='my-icon-class'></i>),

      // For `string` type example
      expandHandle: (name, event) => { /* your code */ },
      collapseHandle: (name, event) => { /* your code */ },
      clickHandle: (name, event) => { /* your code */ }
    }
  ];
  const conf = defConf(children);

  // `string` type example
  conf.child.listen = {
    expand: 'expandHandle',
    collapse: 'collapseHandle',
    click: 'clickHandle'
  };
  // `function` type example
  conf.child.listen = {
    expand: (name, event) => { /* your code */ },
    collapse: (name, event) => { /* your code */ },
    click: (name, event) => { /* your code */ }
  };
  // ...
  ``` 

  ### Full description of configuration
  Below you can see full configuration description for `mini-tree-react`. `?` - not require.
  ```javascript
  const conf = {
    expand: [single | multi | (item, expand) => {}],
    resolve: [param | field | (parent, childConf) => {}],
    child: {
      icon?: [string | function],
      title: [string | function],
      behaviorExpanded?: [string | function],
      behaviorCollapsed?: [string | function]      
    },
    children?: [ ... ]
  };
  ```

  ## Styling

  ### Available classes
  You can style using CSS. CSS classes list:
  ```css
  /* Tree class */
  .mini-tree { /* your code */ }
  /* Items list class  */
  .mini-tree-items { /* your code */ } 
  /* Item class */                     
  .mini-tree-item { /* your code */ }
  /* Item icon container class */
  .mini-tree-item-icon { /* your code */ }
  /* Item behavior container class */
  .mini-tree-item-behavior { /* your code */ }
  /* Item behavior icon container class */
  .mini-tree-item-behavior-icon { /* your code */ }
  /* Item class, when item was expanded */
  .mini-tree-item.expanded
  ```

  ### Base styles
  Below you can see base description of `mini-tree-react` styles. Use this description to simplify styling. Also you can find this description in file: `mini-tree-react.css`, it is can be load via `css-loader` and `style-loader`, more information on `https://webpack.js.org/loaders/css-loader/`.
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
    padding: 15px 0px 15px 25px;
    cursor: default;
  }
  .mini-tree-item-behavior:hover {
    color: rgb(99, 122, 156);
    cursor: pointer;
  }
  .mini-tree-item-behavior:hover .mini-tree-item-icon {
    color: rgb(99, 122, 156);
    cursor: pointer;
  }
  .mini-tree-item-behavior:hover .mini-tree-item-behavior-icon {
    color: rgb(99, 122, 156);
    cursor: pointer;
  }                    
  .mini-tree-item {    
    overflow: hidden;
    position: relative;
  }
  .mini-tree-item-icon {
    margin-right: 5px;              
  }
  .mini-tree-item-behavior-icon {
    margin-left: 5px;
  }
  .mini-tree-item.expanded .mini-tree-items {
    display: none;
  }
  .mini-tree-item:before {    
    top: 22px;
    width: 15px;
    content: ' ';
    position: absolute;
    display: inline-block;
    border: 0.5px solid #ccc;
  }
  .mini-tree-items {
    padding: 0;
    list-style: none;
    margin-left: 25px;
    border-left: 0.5px solid #ccc;
  }  
  ```