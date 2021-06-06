import React from 'react';

import './app-header.css';

const AppHeader = ({ toDo, done }) => {
  const result = toDo > 0 ?  toDo  + ' more left to do, ' +  done  + ' done' : 'Done!';
  const newResult = toDo === 0 && done === 0 ? 'Add your first todo' : result;
  
  let doneClass = '';
  if (toDo === 0 && done !== 0) {
    doneClass += 'alldone';
  } else if (toDo === 0 && done === 0) {
    doneClass += 'firsttodo';
  }

    return (

      <div className="app-header d-flex">
        <h2 className={doneClass}>{ newResult }</h2>
      </div>
    );
};

export default AppHeader;