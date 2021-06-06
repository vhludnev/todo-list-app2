import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ label, onDeleted, onToggleImportant, onToggleDone, done, important }) => {

    let importantClass = '';
    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
        importantClass += 'active';
    }

    return (
        <div className={classNames}>
            <span 
                className="todo-list-item-label" 
                onClick={onToggleDone} >
                { label }
            </span>
            <div className="buttonsbox">
                <button type="button"
                        className={`btn btn-outline-success btn-sm float-right ${importantClass}`}
                        onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
            </div>
        </div>
    );
}

export default TodoListItem; 