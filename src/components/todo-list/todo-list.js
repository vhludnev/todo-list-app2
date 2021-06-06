import React from 'react';

import TodoListItem from '../todo-list-item';

import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {  

    const elements = todos.map(item => {
      const { id, ...otherLabels } = item;
      
      return (
        // <li key={item.id}>
        //   <TodoListItem 
        //     label={item.label}
        //     important={item.important} />
        // </li>
        ///// the same but with spread operator for objects /////

        <li key={id} className="list-group-item">
          <TodoListItem 
            { ...otherLabels } 
            onDeleted={ () => onDeleted(id) } 
            onToggleImportant={ () => onToggleImportant(id) }
            onToggleDone={ () => onToggleDone(id) }/>
        </li>
      );
    });

    return (
      <ul className="list-group todo-list">
        { elements }
      </ul>
    );
  }

  export default TodoList;