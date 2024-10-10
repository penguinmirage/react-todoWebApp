import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import "./task.css";

export default class TodoListItem extends Component {
  state = {
    isEditing: false,
    editedTask: this.props.label,
    createdTime: new Date(),
    editedTime: null,
  };

  beginEditing = () => {
    this.setState({ isEditing: true }); // Enters the edit mode
  };

  whatIsEditing = (e) => {
    this.setState({ editedTask: e.target.value }); // Works while we edit
  };

  saveChangesEditing = (e) => {
    e.preventDefault();
    const { editedTask } = this.state;
    const { onEdited } = this.props;

    if (editedTask.trim()) {
      onEdited(editedTask);
      this.setState({ isEditing: false, editedTime: new Date() });
    }
  }; // Exit edit mode

  // Save changes if Enter key is pressed
  saveOnEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      this.saveChangesEditing(e);
    }
  };

  createTimestamp = () => {
    const { createdTime, editedTime } = this.state;
    if (editedTime) {
      return `edited ${formatDistanceToNow(
        new Date(editedTime),
        { includeSeconds: true },
        {
          addSuffix: true,
        }
      )}`;
    } else {
      return `created ${formatDistanceToNow(
        new Date(createdTime),
        { includeSeconds: true },
        {
          addSuffix: true,
        }
      )}`;
    }
  };

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;
    const { isEditing, editedTask } = this.state;

    let classNames = "todo-list-item description";
    if (done) {
      classNames += " done completed";
    }

    // для isEditing делаем тернарник: ?едитТаск :обычныйТаск

    return (
      <span className="todo-list">
        <input
          className="toggle"
          type="checkbox"
          onChange={onToggleDone}
          checked={done}
        />
        {isEditing ? (
          <li className="editing">
            <input
              type="text"
              value={editedTask}
              onChange={this.whatIsEditing}
              onKeyDown={this.saveOnEnterKeyDown}
              className="edit"
              onSubmit={this.saveChangesEditing}
              autoFocus
            />
          </li>
        ) : (
          <label className="todo-list-item" onClick={onToggleDone}>
            <span className={classNames}>{label}</span>
            <span className="created">{this.createTimestamp()}</span>
          </label>
        )}

        <div type="button" className="btn" onClick={this.beginEditing}>
          <i className="icon icon-edit" />
        </div>

        <div type="button" className="btn" onClick={onDeleted}>
          <i className="icon icon-destroy" />
        </div>
      </span>
    );
  }
}
TodoListItem.defaultProps = {
  filter: "all", // Default value for the filter prop
};

TodoListItem.propTypes = {
  filter: PropTypes.string,
};

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
