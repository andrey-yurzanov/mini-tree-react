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
* [Styling](#styling)
  * [Available classes](#available-classes)
  * [Base styles](#base-styles)

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
  Every item contains `icon`, ` title` and `behavior`. `behavior` devides into two variants: `behaviorExpanded` and `behaviorCollapsed`. By default uses only `title` with value - 'title'. You can define self values ​​for item content resolving. Value can be of types `string` or `function`. Example:
  ```javascript
  import { Tree, defConf } from 'mini-tree-react';  
  const children = [
    {
      icon: (<i className='my-icon-class'></i>),
      title: 'First item',
      expandedIcon: (<i className='my-icon-class'></i>),
      collapsedIcon: (<i className='my-icon-class'></i>)
    }
  ];
  const conf = defConf(children);

  // `string` type example
  conf.child = {
    icon: 'icon',
    title: 'title',
    behaviorExpanded: 'expandedIcon',
    behaviorCollapsed: 'collapsedIcon'
  };
  // `function` type example
  conf.child = {
    icon: (item, index, conf) => { /* your code */ },
    title: (item, index, conf) => { /* your code */ },
    behaviorExpanded: (item, index, conf) => { /* your code */ },
    behaviorCollapsed: (item, index, conf) => { /* your code */ }
  };
  ``` 

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