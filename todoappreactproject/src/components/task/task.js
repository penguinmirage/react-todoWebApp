import React, { Component } from "react";
import "./task.css";

// function Task({ label }) {
//   const style = {
//     color: "black",
//     fontWeight: "normal",
//   };
//
//   return (
//     <span className="new-todo">
//       <span className="new-todo-label" style={style}>
//         {label}
//       </span>
//
//       <button
//         type="button"
//         className="btn btn-outline-success btn-sm float-right"
//       >
//         <i className="fa fa-exclamation" />
//       </button>
//
//       <button
//         type="button"
//         className="btn btn-outline-danger btn-sm float-right"
//       >
//         <i className="fa fa-trash-o" />
//       </button>
//     </span>
//   );
// }

export default class Task extends Component {
  state = {
    done: false,
    important: false,
  };

  onLabelClick = () => {
    // console.log(`Done: ${this.props.label}`);
    this.setState(({ done }) => {
      return {
        done: !done,
      };
      // cb => prevState или "старое состояние"
    });
  };

  onMarkImportant = () => {
    // this.setState({
    //   important: true,
    // });
    this.setState(({ important }) => {
      return {
        important: !important,
      };
      // cb => prevState или "старое состояние"
    });
  };

  // onLabelClick() {
  // console.log(`Done: ${this.props.label}`);
  // is.state

  render() {
    const { label, onDeleted } = this.props;
    const { done, important } = this.state;

    let classNames = "todo-list-item description";
    if (done) {
      classNames += " done completed";
    }

    if (important) {
      classNames += " important";
    }

    return (
      <span className={classNames}>
        <input
          className="toggle"
          type="checkbox"
          onClick={this.onLabelClick}
          checked={done}
        ></input>
        <label onClick={this.onLabelClick}>
          <span className="description">{label}</span>
          <span className="created">created 17 seconds ago</span>
        </label>

        <button type="button" className="btn btn-outline-edit">
          <i className="icon icon-edit" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={onDeleted}
        >
          <i className="icon icon-destroy" />
        </button>
      </span>
    );
  }
}

// {" "}
// <button
//   type="button"
//   className="btn btn-outline-success btn-sm float-right"
//   onClick={this.onMarkImportant}
// >
//   {" "}
//   <i className="fa fa-exclamation" />
// </button>{" "}
