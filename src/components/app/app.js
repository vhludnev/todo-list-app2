import React, { Component } from 'react';
//import { v1 as uuidv1 } from 'uuid';

// components:
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

//  maxId = 100; // new todos will have ids starting from number 100 

  state = {
    todoData: [],
    term: '',
    filter: 'all' // active, all, done
  };

 initialTodos = () => {  
   if (localStorage.getItem('todos')) {
     this.setState(() => {
       return {
         todoData: JSON.parse(localStorage.getItem('todos'))
       };
     })
   }
 }

  createTodoItem(label) { // will return: { label: '...', important: false, done: false, id: ... }
    return {
      label,              // the same as: label: label
      important: false,
      done: false,
      id: Date.now() /* uuidv1() */  /* this.maxId++ */  // generating id (timestamp in ms)
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      // todoData.splice(idx, 1)  /* should never be used derectly on existing state of Array of data */ 

      ////// correct way:
      // const before = todoData.slice(0, idx);
      // const after = todoData.slice(idx + 1);
      // const newArray = [ ...before, ... after];

      ///// the shorter version of above written:
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      // todoData.push(newItem); /* should never be used derectly on existing state of Array of data */ 
      ////// correct way:
      const newArr = [ ...todoData, newItem ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1;   // indexOf(term) returns 0 or more (t.i. > -1) if there is a label(term)
    })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all': 
        return items;
      case 'active':
        return items.filter(item => !item.done); // the same as: item.done === false
      case 'done':
        return items.filter(item => item.done); // the same as: item.done === true
      default:
        return items;
    }
  }

  componentDidMount() { 
    // Load toods from LS once after reboot
    this.initialTodos()  
  }

  componentDidUpdate() {
    // Save to Local Storage
    localStorage.setItem('todos', JSON.stringify(this.state.todoData));
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length,
          todoCount = todoData.length - doneCount;

    const todayDate = new Date().toLocaleDateString((navigator.userLanguage||navigator.browserLanguage||navigator.language), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="todo-app container">
        <span className="date">{todayDate}</span>
        <h1>My Todo List App 2</h1>
        <AppHeader toDo={todoCount} done={doneCount} />
        <ItemAddForm 
          onItemAdded={this.addItem} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>
        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />      
      </div>
    );
  }
};
