import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

const TodoListItem = ({ id, label, onDeleted, onEdited, onToggleDone, done, isNewTask }) => {
  const existingElapsedTime = parseInt(localStorage.getItem(`timer-${id}`)) || 0;
  const existingTimerActive = JSON.parse(localStorage.getItem(`timerActive-${id}`)) || false;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(label);
  const [createdTime] = useState(new Date());
  const [editedTime, setEditedTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(isNewTask ? 0 : existingElapsedTime);
  const [timerActive, setTimerActive] = useState(isNewTask ? false : existingTimerActive);

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      intervalId = startTimer();
    }

    return () => {
      clearInterval(intervalId);
      localStorage.setItem(`timer-${id}`, elapsedTime);
      localStorage.setItem(`timerActive-${id}`, JSON.stringify(timerActive));
    };
  }, [timerActive, elapsedTime]);

  const startTimer = () => {
    return setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        const newElapsedTime = prevElapsedTime + 1;
        localStorage.setItem(`timer-${id}`, newElapsedTime);
        return newElapsedTime;
      });
    }, 1000);
  };

  const handleStartStop = () => {
    if (timerActive) {
      setTimerActive(false);
    } else {
      setTimerActive(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleToggleDone = () => {
    onToggleDone(id);
    if (!done) {
      setTimerActive(false);
    }
  };

  const saveChangesEditing = (e) => {
    e.preventDefault();
    if (editedTask.trim()) {
      onEdited(editedTask);
      setIsEditing(false);
      setEditedTime(new Date());
    }
  };

  const createTimestamp = () => {
    return editedTime
      ? `edited ${formatDistanceToNow(new Date(editedTime), { includeSeconds: true })}`
      : `created ${formatDistanceToNow(new Date(createdTime), { includeSeconds: true })}`;
  };

  let classNames = 'todo-list-item description';
  if (done) {
    classNames += ' done completed';
  }

  return (
    <span className="todo-list">
      <input className="toggle" type="checkbox" onChange={handleToggleDone} checked={done} />
      {isEditing ? (
        <li className="editing">
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveChangesEditing(e)}
            className="edit"
            autoFocus
          />
        </li>
      ) : (
        <label className="todo-list-item" onClick={handleToggleDone}>
          <span className={classNames}>{label}</span>
          <span className="created">{createTimestamp()}</span>
        </label>
      )}

      <div className="timer">
        <span>{formatTime(elapsedTime)}</span>
        <button onClick={handleStartStop} className="icon-timer">
          {timerActive ? '⏸' : '▶'}
        </button>
      </div>

      <li className="btn" onClick={() => setIsEditing(true)}>
        <i className="icon icon-edit" />
      </li>

      <li className="btn" onClick={onDeleted}>
        <i className="icon icon-destroy" />
      </li>
    </span>
  );
};

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

export default TodoListItem;

// Ранняя версия в виде класс-компонента:

// import React, { Component } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import PropTypes from 'prop-types';
// import './task.css';
//
// export default class TodoListItem extends Component {
//   state = {
//     isEditing: false,
//     editedTask: this.props.label,
//     createdTime: new Date(),
//     editedTime: null,
//   };
//
//   beginEditing = () => {
//     this.setState({ isEditing: true });
//   };
//
//   whatIsEditing = (e) => {
//     this.setState({ editedTask: e.target.value });
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
//   };
//
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
//     const { label, onDeleted, onToggleDone, done } = this.props;
//     const { isEditing, editedTask } = this.state;
//
//     let classNames = 'todo-list-item description';
//     if (done) {
//       classNames += ' done completed';
//     }
//
//     return (
//       <span className="todo-list">
//         <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
//         {isEditing ? (
//           <li className="editing">
//             <input
//               type="text"
//               value={editedTask}
//               onChange={this.whatIsEditing}
//               onKeyDown={this.saveOnEnterKeyDown}
//               className="edit"
//               onSubmit={this.saveChangesEditing}
//               autoFocus
//             />
//           </li>
//         ) : (
//           <label className="todo-list-item" onClick={onToggleDone}>
//             <span className={classNames}>{label}</span>
//             <span className="created">{this.createTimestamp()}</span>
//           </label>
//         )}
//
//         <div type="button" className="btn" onClick={this.beginEditing}>
//           <i className="icon icon-edit" />
//         </div>
//
//         <div type="button" className="btn" onClick={onDeleted}>
//           <i className="icon icon-destroy" />
//         </div>
//       </span>
//     );
//   }
// }
// TodoListItem.defaultProps = {
//   filter: 'all',
// };
//
// TodoListItem.propTypes = {
//   filter: PropTypes.string,
//   label: PropTypes.string,
//   onEdited: PropTypes.object,
//   onDeleted: PropTypes.number,
//   onToggleDone: PropTypes.bool,
//   done: PropTypes.bool,
// };
