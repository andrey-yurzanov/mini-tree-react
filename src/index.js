import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';

const conf = {
  expandModel: '',
  items: {
    title: (item, index, conf) => {
      console.log(item);
      console.log(index);
      console.log(conf);
      return item.name + '-' + (index + 1);
    }
  }
};

ReactDOM.render((<Tree conf={ conf } items={ [ { name: 'FIRST', items: [ { name: 'SUBFIRST', items: [ { name: 'SUBSUBITEM' } ] } ] } ] } />), document.getElementById('root'));