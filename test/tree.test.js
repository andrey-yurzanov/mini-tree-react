import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Tree, defConf } from '../src/components/tree'; 
import { field } from '../src/components/resolve';
import { multi } from '../src/components/expand';

const createChildren = (count, depth) => {
  if (depth > 0) {
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push({
        name: 'item-' + depth + '-' + i,
        children: createChildren(count, depth - 1)     
      });
    }
    return children;
  }
};

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Param resolve checking', () => {
  act(() => { 
    render(<Tree conf={ defConf(createChildren(10, 3)) } />, container); 
  });
  expect(container.querySelector('.mini-tree')).not.toBeNull();
  expect(container.querySelector('.mini-tree-item')).not.toBeNull();
});
it('Field resolve checking', () => {
  act(() => { 
    const conf = defConf();
    conf.children = createChildren(10, 3);
    conf.resolve = field();
    render(<Tree conf={ conf } />, container); 
  });
  expect(container.querySelector('.mini-tree')).not.toBeNull();
  expect(container.querySelector('.mini-tree-item')).not.toBeNull();
});

it('Check item elements', () => {
  act(() => { 
    const conf = defConf(createChildren(10, 3));
    conf.child.icon = () => (<div className='test-icon'>ITEM_ICON</div>);
    conf.child.title = () => (<div className='test-title'>ITEM_TITLE</div>);
    conf.child.behaviorCollapsed = () => (<div className='test-collapsed'>ITEM_COLLAPSED</div>);
    render(<Tree conf={ conf } />, container); 
  });
  expect(container.querySelector('.test-icon')).not.toBeNull();
  expect(container.querySelector('.test-icon').textContent).toBe('ITEM_ICON');
  expect(container.querySelector('.test-title')).not.toBeNull();
  expect(container.querySelector('.test-title').textContent).toBe('ITEM_TITLE');
  expect(container.querySelector('.test-collapsed')).not.toBeNull();
  expect(container.querySelector('.test-collapsed').textContent).toBe('ITEM_COLLAPSED');  
});

it('Single expand checking', () => {
  act(() => {
    render(<Tree conf={ defConf(createChildren(2, 2)) } />, container); 
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(items[0].parentElement.querySelectorAll('.mini-tree-item').length).toBeGreaterThan(0);

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(items[0].parentElement.querySelectorAll('.mini-tree-item').length).toBe(0);

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  act(() => { 
    items[1].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(items[0].parentElement.querySelectorAll('.mini-tree-item').length).toBe(0);
  expect(items[1].parentElement.querySelectorAll('.mini-tree-item').length).toBeGreaterThan(0);    
});

it('Multi expand checking', () => {
  act(() => {
    const conf = defConf(createChildren(2, 2));
    conf.expand = multi;
    render(<Tree conf={ conf } />, container); 
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(items[0].parentElement.querySelectorAll('.mini-tree-item').length).toBeGreaterThan(0);

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(items[0].parentElement.querySelectorAll('.mini-tree-item').length).toBe(0);

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  act(() => { 
    items[1].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(items[0].parentElement.querySelectorAll('.mini-tree-item').length).toBeGreaterThan(0);
  expect(items[1].parentElement.querySelectorAll('.mini-tree-item').length).toBeGreaterThan(0);    
});

it('Listeners checking', () => {
  let actionFlag = '';
  act(() => {
    const conf = defConf(createChildren(2, 2));
    conf.child.listen = {
      expand: () => actionFlag = 'expand',
      collapse: () => actionFlag = 'collapse',
      click: () => actionFlag = 'click'
    };
    render(<Tree conf={ conf } />, container); 
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(actionFlag).toBe('expand');    

  act(() => { 
    items[0].parentElement
            .querySelector('.mini-tree-item')
            .querySelector('.mini-tree-item-behavior')
            .dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });  
  expect(actionFlag).toBe('click');

  act(() => { 
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); 
  });
  expect(actionFlag).toBe('collapse');
});

