import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <form className="item-add-form d-flex"
            onSubmit={this.state.label ? this.onSubmit : e => e.preventDefault()} >
        <input type="text"
                className="form-control"
                placeholder="add your todo" 
                onChange={this.onLabelChange}
                value={this.state.label} />
        <button className="btn btn-outline-secondary" >
                Add
        </button>
      </form>
    );
  };
}