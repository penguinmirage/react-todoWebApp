import React, { Component } from "react";
import "./task.css";

export default class TodoListItem extends Component {
  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;

    // Set up className based on `done` state to apply the line-through effect
    let classNames = "todo-list-item description";
    if (done) {
      classNames += " done completed";
    }

    return (
      <span className="todo-list">
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleDone}
          checked={done}
        />
        <label className="todo-list-item" onClick={onToggleDone}>
          <span className={classNames}>{label}</span>
          <span className="created">some date info here</span>
        </label>

        <div type="button" className="btn">
          <i className="icon icon-edit" />
        </div>

        <div type="button" className="btn" onClick={onDeleted}>
          <i className="icon icon-destroy" />
        </div>
      </span>
    );
  }
}

// export default class Task extends Component {
//   state = {
//     done: false,
//     important: false,
//   };
//
//  onLabelClick = () => {
//     // console.log(`Done: ${this.props.label}`);
//     this.setState(({ done }) => {
//       return {
//         done: !done,
//       };
//       // cb => prevState или "старое состояние"
//     });
//   };
//
//   // onMarkImportant = () => {
//   //   // this.setState({
//   //   //   important: true,
//   //   // });
//   //   this.setState(({ important }) => {
//   //     return {
//   //       important: !important,
//   //     };
//   //     // cb => prevState или "старое состояние"
//   //   });
//   // };
//
//   handleKeyDown = (e) => {
//     const { id, onEdit } = this.props;
//     if (e.key === "Enter") {
//       onEdit(id, e.target.value); // Save the new label
//     }
//   };
//
//   // Handle losing focus on the input
//   // handleBlur = (e) => {
//   //   const { id, onEdit } = this.props;
//   //   onEdit(id, e.target.value); // Save the new label
//   // };
//
//   // onEdit(label) {
//   //   // состояние изменения
//   //
//   //
//   //
//   //   //запись в onLabelClick
//   //   return this.onLabelClick()
//   // }
//
//   // onLabelClick() {
//   // console.log(`Done: ${this.props.label}`);
//   // is.state
//
//   render() {
//     const { label, onDeleted, onLabelClick, onToggleDone, done } = this.props;
//
//     let classNames = "todo-list-item description";
//     if (done) {
//       classNames += " completed";
//     }
//
//     return (
//       <span className={classNames}>
//         <input
//           className="toggle"
//           type="checkbox"
//           onClick={() => this.onLabelClick}
//           checked={done}
//         ></input>
//         <label onClick={this.onLabelClick}>
//           <span className="description">{label}</span>
//           <span className="created">insert current created date</span>
//         </label>
//
//         <div type="button" className="btn btn-outline-edit">
//           <i className="icon icon-edit" />
//         </div>
//         <div
//           type="button"
//           className="btn btn-outline-danger"
//           onClick={onDeleted}
//         >
//           <i className="icon icon-destroy" />
//         </div>
//       </span>
//     );
//   }
// }

//меняем button на div выше, так как иначе кнопки отображаются кнопками, а текущий CSS их не прячет. Задачи изменять CSS файл нет
