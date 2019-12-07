import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Tree, defConf, findTree, ResolveModels, ExpandModels, SelectModels } from '../src/index';

const createChildren = (count, depth) => {
  const children = [];
  if (depth > 0) {
    for (let i = 0; i < count; i++) {
      children.push({
        id: 'item-' + depth + '-' + i,
        content: 'item-' + depth + '-' + i,
        children: createChildren(count, depth - 1)
      });
    }
  }
  return children;
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

it('defConf()', () => {
  const conf = defConf('tree-test', []);
  expect(conf).not.toBeNull();
  expect(conf.id).toBe('tree-test');
  expect(conf.resolve).not.toBeNull();
  expect(conf.expand).not.toBeNull();
  expect(conf.select).not.toBeNull();
  expect(conf.child).not.toBeNull();
  expect(conf.id).not.toBeNull();
  expect(conf.content).not.toBeNull();
});

it('findTree()', () => {
  act(() => {
    render(<Tree conf={ defConf('tree-test', createChildren(10, 3)) } />, container);
  });
  expect(container.querySelector('.mini-tree')).not.toBeNull();
  expect(container.querySelector('.mini-tree-item')).not.toBeNull();
  expect(findTree('tree-test')).not.toBeNull();
});

it('Tree.hasChildren()', () => {
  act(() => {
    render(<Tree conf={ defConf('tree-test', createChildren(10, 3)) } />, container);
  });

  const tree = findTree('tree-test');
  expect(tree).not.toBeNull();
  expect(tree.hasChildren).not.toBeNull();
  expect(tree.hasChildren()).toBe(true);
});

it('Tree.getChildren()', () => {
  act(() => {
    render(<Tree conf={ defConf('tree-test', createChildren(10, 3)) } />, container);
  });

  const tree = findTree('tree-test');
  expect(tree).not.toBeNull();
  expect(tree.getChildren).not.toBeNull();
  expect(tree.getChildren()).not.toBeNull();
  expect(tree.getChildren().length).not.toBe(0);
});

it('Tree.resolve(ResolveModels.param)', () => {
  act(() => {
    render(<Tree conf={ defConf('tree-test', createChildren(10, 3)) } />, container);
  });
  expect(container.querySelector('.mini-tree')).not.toBeNull();
  expect(container.querySelector('.mini-tree-item')).not.toBeNull();
});

it('Tree.resolve(ResolveModels.field)', () => {
  act(() => {
    const conf = defConf();
    conf.children = createChildren(10, 3);
    conf.resolve = ResolveModels.field();
    render(<Tree conf={ conf } />, container);
  });
  expect(container.querySelector('.mini-tree')).not.toBeNull();
  expect(container.querySelector('.mini-tree-item')).not.toBeNull();
});

it('Tree.expand(ExpandModels.none)', () => {
  act(() => {
    const conf = defConf('test-tree', createChildren(2, 2));
    conf.expand = ExpandModels.none;
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBe(0);
});

it('Tree.expand(ExpandModels.single)', () => {
  act(() => {
    const conf = defConf('test-tree', createChildren(2, 2));
    conf.expand = ExpandModels.single;
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBe(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  act(() => {
    items[3].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBe(0);
  expect(items[3].parentElement.querySelectorAll('.expanded').length).toBeGreaterThan(0);
});

it('Tree.expand(ExpandModels.multi)', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBe(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  act(() => {
    items[3].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBeGreaterThan(0);
  expect(items[3].parentElement.querySelectorAll('.expanded').length).toBeGreaterThan(0);
});

it('Tree.select(SelectModels.none)', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    conf.select = SelectModels.none;
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBe(0);
});

it('Tree.select(SelectModels.single)', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    conf.select = SelectModels.single;
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBe(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  act(() => {
    items[3].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBe(0);
  expect(items[3].parentElement.querySelectorAll('.selected').length).toBeGreaterThan(0);
});

it('Tree.select(SelectModels.multi)', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBe(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  act(() => {
    items[3].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBeGreaterThan(0);
  expect(items[3].parentElement.querySelectorAll('.selected').length).toBeGreaterThan(0);
});

it('Tree.findChild()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const tree = findTree('tree-test');
  expect(tree).not.toBeNull();
  expect(tree.findChild).not.toBeNull();
  expect(tree.findChild('item-2-0')).not.toBeNull();
});

it('TreeItem.content', () => {
  act(() => {
    const children = [
      {
        id: 'item-1',
        content: 'item-1'
      }
    ];
    const conf = defConf('tree-test', children);
    conf.child.content = (data) => (<span id={ data.item.id }>{ data.item.content }</span>);
    render(<Tree conf={ conf } />, container);
  });

  const item = container.querySelector('#item-1');
  expect(item).not.toBeNull();
  expect(item.textContent).toBe('item-1');
});

it('TreeItem.toggleSelected()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.toggleSelected).not.toBeNull();

  child.toggleSelected();
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBeGreaterThan(0);

  child.toggleSelected();
  expect(items[0].parentElement.querySelectorAll('.selected').length).toBe(0);
});

it('TreeItem.toggleExpanded()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });
  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.toggleExpanded).not.toBeNull();

  child.toggleExpanded();
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBeGreaterThan(0);

  child.toggleExpanded();
  expect(items[0].parentElement.querySelectorAll('.expanded').length).toBe(0);
});

it('TreeItem.hasChildren()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.hasChildren).not.toBeNull();
  expect(child.hasChildren()).toBe(true);
});

it('TreeItem.getChildren()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.getChildren).not.toBeNull();
  expect(child.getChildren()).not.toBeNull();
  expect(child.getChildren().length).toBeGreaterThan(0);
});

it('TreeItem.isSelected()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.isSelected).not.toBeNull();

  child.toggleSelected();
  expect(child.isSelected()).toBe(true);

  child.toggleSelected();
  expect(child.isSelected()).toBe(false);
});

it('TreeItem.isExpanded()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.isExpanded).not.toBeNull();

  child.toggleExpanded();
  expect(child.isExpanded()).toBe(true);

  child.toggleExpanded();
  expect(child.isExpanded()).toBe(false);
});

it('TreeItem.getData()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  const child = findTree('tree-test').findChild('item-2-0');
  expect(child.getData).not.toBeNull();
  expect(child.getData()).not.toBeNull();
  expect(child.getData().id).toBe('item-2-0');
});

it('TreeItem.getParent()', () => {
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  let child = findTree('tree-test').findChild('item-2-0');
  expect(child.getParent).not.toBeNull();
  expect(child.getParent()).toBeUndefined();

  child = child.getChildren()[0];
  expect(child.getParent()).not.toBeNull();
  expect(child.getParent().getData().id).toBe('item-2-0');
});

it('TreeItem.listen(onClick)', () => {
  let clickEvent = null;
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    conf.child.listen = {
      onClick: (event, data) => clickEvent = event
    };
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(clickEvent).not.toBeNull();
});

it('TreeItem.listen(onDoubleClick)', () => {
  let doubleClickEvent = null;
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    conf.child.listen = {
      onDoubleClick: (event, data) => doubleClickEvent = event
    };
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(doubleClickEvent).not.toBeNull();
});

it('TreeItem.listen(onExpand/onCollapse)', () => {
  let expandEvent = null;
  let collapseEvent = null;
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    conf.child.listen = {
      onExpand: (event, data) => expandEvent = event,
      onCollapse: (event, data) => collapseEvent = event
    };
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(expandEvent).not.toBeNull();
  expect(collapseEvent).toBeNull();

  act(() => {
    items[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  });
  expect(collapseEvent).not.toBeNull();
});

it('TreeItem.listen(onSelect/onUnselect)', () => {
  let selectEvent = null;
  let unselectEvent = null;
  act(() => {
    const conf = defConf('tree-test', createChildren(2, 2));
    conf.child.listen = {
      onSelect: (event, data) => selectEvent = event,
      onUnselect: (event, data) => unselectEvent = event
    };
    render(<Tree conf={ conf } />, container);
  });

  const items = document.querySelectorAll('.mini-tree-item-behavior');
  expect(items.length).toBeGreaterThan(0);

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(selectEvent).not.toBeNull();
  expect(unselectEvent).toBeNull();

  act(() => {
    items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(unselectEvent).not.toBeNull();
});