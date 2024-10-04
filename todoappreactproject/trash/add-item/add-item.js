import React, { Component } from "react";

export default class AddItem extends Component {
  state = {
    inputText: "", // Initialize the input text state
    todoData: [], // Initialize the todo array
  };

  // Function to add the item
  AddItem = () => {
    const { inputText, todoData } = this.state;

    if (inputText.trim() !== "") {
      // Create a new todo item with label and id
      const newItem = {
        label: inputText,
        id: new Date().getTime(), // Generate unique id using timestamp
      };

      // Update the state with the new item in the todoData array
      this.setState({
        todoData: [...todoData, newItem], // Add new item to the array
        inputText: "", // Clear the input field afthhhh
      });
    }
  };

  // Function to handle input change
  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  render() {
    const { inputText } = this.state; // Destructure inputText from state

    return (
      <span className="add-btn">
        <input
          type="text"
          value={inputText} // Bind the input value to the state
          className="add-input"
          placeholder="type to add"
          onChange={this.handleInputChange} // Update state when input changes
        />
        <button
          type="button"
          className="btn btn-outline-add btn-sm float-right"
          onClick={this.AddItem} // Call the AddItem function on click
        >
          <i className="fa fa-add-o" />
        </button>
      </span>
    );
  }
}
