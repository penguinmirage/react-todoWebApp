import React, { Component } from "react";
import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
    todoData: [{ label: null, important: false, id: null }],
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label);
  };

  render() {
    return (
      <form className="new-todo" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          //onKeyDown={(e) => {
          // if (e.key === "Enter") {
          //   console.log("Enter key pressed");
          //   this.props.addItem("Hello World Text");
          // }
          //}}
        />
      </form>
    );
  }
}

// {" "}
//   <button
//     className="btn btn-outline-secondary"
//     onClick={() => this.props.addItem("Hello World")}
//   >
//     Save
//   </button>{" "}
//
