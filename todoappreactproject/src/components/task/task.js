import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);

    // Retrieve timer info from localStorage based on unique ID
    const existingElapsedTime = parseInt(localStorage.getItem(`timer-${this.props.id}`)) || 0;
    const existingTimerActive = JSON.parse(localStorage.getItem(`timerActive-${this.props.id}`)) || false;

    this.state = {
      isEditing: false,
      editedTask: this.props.label,
      createdTime: new Date(),
      editedTime: null,
      elapsedTime: this.props.isNewTask ? 0 : existingElapsedTime,
      timerActive: this.props.isNewTask ? false : existingTimerActive,
    };

    this.intervalId = null;
  }

  componentDidMount() {
    if (this.state.timerActive) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    localStorage.setItem(`timer-${this.props.id}`, this.state.elapsedTime);
    localStorage.setItem(`timerActive-${this.props.id}`, JSON.stringify(this.state.timerActive));
  }

  startTimer = () => {
    if (!this.state.timerActive) {
      this.intervalId = setInterval(() => {
        this.setState((prevState) => {
          const newElapsedTime = prevState.elapsedTime + 1;
          localStorage.setItem(`timer-${this.props.id}`, newElapsedTime);
          return { elapsedTime: newElapsedTime, timerActive: true };
        });
      }, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.intervalId);
    this.setState({ timerActive: false });
    localStorage.setItem(`timerActive-${this.props.id}`, JSON.stringify(false));
  };

  resetTimer = () => {
    clearInterval(this.intervalId);
    this.setState({ elapsedTime: 0, timerActive: false });
    localStorage.setItem(`timer-${this.props.id}`, 0);
    localStorage.setItem(`timerActive-${this.props.id}`, JSON.stringify(false));
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  handleToggleDone = () => {
    this.props.onToggleDone(this.props.id);
    if (!this.props.done) {
      this.stopTimer();
    }
  };

  beginEditing = () => {
    this.setState({ isEditing: true });
  };

  saveChangesEditing = (e) => {
    e.preventDefault();
    const { editedTask } = this.state;
    const { onEdited } = this.props;

    if (editedTask.trim()) {
      onEdited(editedTask);
      this.setState({ isEditing: false, editedTime: new Date() });
    }
  };

  saveOnEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.saveChangesEditing(e);
    }
  };

  createTimestamp = () => {
    const { createdTime, editedTime } = this.state;
    return editedTime
      ? `edited ${formatDistanceToNow(new Date(editedTime), { includeSeconds: true })}`
      : `created ${formatDistanceToNow(new Date(createdTime), { includeSeconds: true })}`;
  };

  render() {
    const { label, onDeleted, done } = this.props;
    const { isEditing, editedTask, elapsedTime, timerActive } = this.state;

    let classNames = 'todo-list-item description';
    if (done) {
      classNames += ' done completed';
    }

    return (
      <span className="todo-list">
        <input className="toggle" type="checkbox" onChange={this.handleToggleDone} checked={done} />
        {isEditing ? (
          <li className="editing">
            <input
              type="text"
              value={editedTask}
              onChange={(e) => this.setState({ editedTask: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && this.saveChangesEditing(e)}
              className="edit"
              autoFocus
            />
          </li>
        ) : (
          <label className="todo-list-item" onClick={this.handleToggleDone}>
            <span className={classNames}>{label}</span>
            <span className="created">{this.createTimestamp()}</span>
          </label>
        )}

        <div className="timer">
          <span>{this.formatTime(elapsedTime)}</span>
          <button onClick={timerActive ? this.stopTimer : this.startTimer} className="icon-timer">
            {timerActive ? '⏸' : '▶'}
          </button>
        </div>

        <li className="btn" onClick={() => this.setState({ isEditing: true })}>
          <i className="icon icon-edit" />
        </li>

        <li className="btn" onClick={onDeleted}>
          <i className="icon icon-destroy" />
        </li>
      </span>
    );
  }
}

TodoListItem.defaultProps = {
  filter: 'all',
  done: false,
  isNewTask: false,
};

TodoListItem.propTypes = {
  filter: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onEdited: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool,
  isNewTask: PropTypes.bool,
};

// import React, { Component } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import PropTypes from 'prop-types';
// import './task.css';
//
// export default class TodoListItem extends Component {
//   constructor(props) {
//     super(props);
//
//     // Initialize state, check for existing timer values in local storage for each task
//     const existingElapsedTime = parseInt(localStorage.getItem(`timer-${this.props.id}`)) || 0;
//     const existingTimerActive = JSON.parse(localStorage.getItem(`timerActive-${this.props.id}`)) || false;
//
//     this.state = {
//       isEditing: false,
//       editedTask: this.props.label,
//       createdTime: new Date(),
//       editedTime: null,
//       elapsedTime: this.props.isNewTask ? 0 : existingElapsedTime,
//       timerActive: this.props.isNewTask ? false : existingTimerActive,
//     };
//
//     this.intervalId = null;
//   }
//
//   componentDidMount() {
//     if (this.state.timerActive) {
//       this.startTimer();
//     }
//   }
//
//   componentWillUnmount() {
//     clearInterval(this.intervalId);
//     // Save current elapsed time and timer state to local storage
//     localStorage.setItem(`timer-${this.props.id}`, this.state.elapsedTime);
//     localStorage.setItem(`timerActive-${this.props.id}`, JSON.stringify(this.state.timerActive));
//   }
//
//   startTimer = () => {
//     if (!this.state.timerActive) {
//       this.intervalId = setInterval(() => {
//         this.setState((prevState) => {
//           const newElapsedTime = prevState.elapsedTime + 1;
//           localStorage.setItem(`timer-${this.props.id}`, newElapsedTime);
//           return { elapsedTime: newElapsedTime, timerActive: true };
//         });
//       }, 1000);
//     }
//   };
//
//   stopTimer = () => {
//     clearInterval(this.intervalId);
//     this.setState({ timerActive: false });
//     localStorage.setItem(`timerActive-${this.props.id}`, JSON.stringify(false));
//   };
//
//   resetTimer = () => {
//     clearInterval(this.intervalId);
//     this.setState({ elapsedTime: 0, timerActive: false });
//     localStorage.setItem(`timer-${this.props.id}`, 0);
//     localStorage.setItem(`timerActive-${this.props.id}`, JSON.stringify(false));
//   };
//
//   formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
//   };
//
//   handleToggleDone = () => {
//     this.props.onToggleDone(this.props.id);
//     if (!this.props.done) {
//       this.stopTimer();
//     }
//   };
//
//   // методы для редактироания тасков
//
//   beginEditing = () => {
//     this.setState({ isEditing: true }); // Enters the edit mode
//   };
//
//   whatIsEditing = (e) => {
//     this.setState({ editedTask: e.target.value }); // Works while we edit
//   };
//
//   saveChangesEditing = (e) => {
//     e.preventDefault();
//     const { editedTask } = this.state;
//     const { onEdited } = this.props;
//
//     if (editedTask.trim()) {
//       onEdited(editedTask);
//       this.setState({ isEditing: false, editedTime: new Date() });
//     }
//   }; // Exit edit mode
//
//   // Save changes if Enter key is pressed
//   saveOnEnterKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       this.saveChangesEditing(e);
//     }
//   };
//
//   createTimestamp = () => {
//     const { createdTime, editedTime } = this.state;
//     if (editedTime) {
//       return `edited ${formatDistanceToNow(
//         new Date(editedTime),
//         { includeSeconds: true },
//         {
//           addSuffix: true,
//         }
//       )}`;
//     } else {
//       return `created ${formatDistanceToNow(
//         new Date(createdTime),
//         { includeSeconds: true },
//         {
//           addSuffix: true,
//         }
//       )}`;
//     }
//   };
//
//   render() {
//     const { label, onDeleted, done } = this.props;
//     const { isEditing, editedTask, elapsedTime, timerActive } = this.state;
//
//     let classNames = 'todo-list-item description';
//     if (done) {
//       classNames += ' done completed';
//     }
//
//     return (
//       <span className="todo-list">
//         <input className="toggle" type="checkbox" onChange={this.handleToggleDone} checked={done} />
//         {isEditing ? (
//           <li className="editing">
//             <input
//               type="text"
//               value={editedTask}
//               onChange={(e) => this.setState({ editedTask: e.target.value })}
//               onKeyDown={(e) => e.key === 'Enter' && this.saveChangesEditing(e)}
//               className="edit"
//               autoFocus
//             />
//           </li>
//         ) : (
//           <label className="todo-list-item" onClick={this.handleToggleDone}>
//             <span className={classNames}>{label}</span>
//             <span className="created">{this.createTimestamp()}</span>
//           </label>
//         )}
//
//         <div className="timer">
//           <span>{this.formatTime(elapsedTime)}</span>
//           <button onClick={timerActive ? this.stopTimer : this.startTimer} className="icon-timer">
//             {timerActive ? '⏸' : '▶'}
//           </button>
//         </div>
//
//         <li className="btn" onClick={() => this.setState({ isEditing: true })}>
//           <i className="icon icon-edit" />
//         </li>
//
//         <li className="btn" onClick={onDeleted}>
//           <i className="icon icon-destroy" />
//         </li>
//       </span>
//     );
//   }
// }
// TodoListItem.defaultProps = {
//   filter: 'all',
//   done: false,
//   isNewTask: false,
// };
//
// TodoListItem.propTypes = {
//   filter: PropTypes.string,
//   id: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   onEdited: PropTypes.func.isRequired,
//   onDeleted: PropTypes.func.isRequired,
//   onToggleDone: PropTypes.func.isRequired,
//   done: PropTypes.bool,
//   isNewTask: PropTypes.bool,
// };

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
