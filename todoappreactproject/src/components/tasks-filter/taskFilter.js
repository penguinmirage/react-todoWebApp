import React, { Component } from "react";

export default class TasksFilter extends Component {
  // необходима константа для работы счетчика {}

  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Completed" },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? "selected" : "btn-outline-secondary";

      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });

    return (
      <ul className="btn-group filters">
        <li>{buttons}</li>
        <li type="button" className="clear-completed">
          Clear completed
        </li>
      </ul>
    );
  }
}
