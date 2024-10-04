import React, { Component } from "react";

export default class TasksFilter extends Component {
  // необходима константа для работы счетчика {}
  render() {
    return (
      <ul className="btn-group filters">
        <li type="button" className="btn btn-info info">
          <button className="selected">All</button>
        </li>
        <li type="button" className="btn btn-outline-secondary">
          <button>Active</button>
        </li>
        <li type="button" className="btn btn-outline-secondary">
          <button>Completed</button>
        </li>
        <li type="button" className="btn btn-outline-secondary">
          <button className="clear-completed">Clear completed</button>
        </li>
      </ul>
    );
  }
}
