import React, { Component } from "react";
import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: "",
    });
  };

  onEdit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
        />
      </form>
    );
  }
}

// return (
// <form className="new-todo" onSubmit={this.onSubmit}>
//   <input
//     className="new-todo"
//     placeholder="What needs to be done?"
//     autoFocus
//     onChange={this.onLabelChange}
//     value={this.state.label}
//   />
// </form>
//<button
//  className="btn btn-outline-secondary"
//  /* onClick={() => this.props.addItem("Hello World")} */
//>
//  Add Item
//</button>
