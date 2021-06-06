import React, { Component } from 'react';

import './todo-list-item.css';

// const TodoListItem = (props) => {
//     return <span>{ props.label }</span>;
// };

//const TodoListItemFunc = ({ label, important = false }) => {
export default class TodoListItem extends Component {

    // state = {
    //     done: false,
    //     important: false
    // };

    // onLabelClick = () => {
    //     this.setState(({done}) => {    // using distructuring
    //         return {
    //             done: !done
    //         }
    //     });
    // }

    // onMarkImportant = () => {
    //     this.setState((state) => {      // not using distructuring
    //         return {
    //             important: !state.important
    //         }
    //     })
    // }

    render() {   
        const { label/* , important = false */, onDeleted, onToggleImportant, onToggleDone, done, important } = this.props;
 //       const { done, important } = this.state;

        let classNames = 'todo-list-item';
        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }
        
        // const style = {
        //     color: important ? 'steelblue' : null,
        //     fontWeight: important ? 'bold' : 'normal'
        // };

        return (
            <span className={classNames}>
                <span 
                    className="todo-list-item-label" 
                    /* style={style} */
                    onClick={onToggleDone} >
                    { label }
                </span>
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    };
}