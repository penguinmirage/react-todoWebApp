// переписанный на хуках компонент
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

const TodoListItem = ({ label, onDeleted, onToggleDone, onEdited, done }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTask, setEditedTask] = useState(label);
	const [createdTime, setCreatedTime] = useState(new Date());
	const [editedTime, setEditedTime] = useState(null);

	const beginEditing = () => setIsEditing(true);

	const whatIsEditing = e => setEditedTask(e.target.value);

	const saveChangesEditing = e => {
		e.preventDefault();
		if (editedTask.trim()) {
			onEdited(editedTask);
			setIsEditing(false);
			setEditedTime(new Date());
		}
	};

	const saveOnEnterKeyDown = e => {
		if (e.key === 'Enter') {
			saveChangesEditing(e);
		}
	};

	const createTimestamp = () => {
		const time = editedTime || createdTime;
		const status = editedTime ? 'edited' : 'created';
		return `${status} ${formatDistanceToNow(time, { includeSeconds: true, addSuffix: true })}`;
	};

	let classNames = 'todo-list-item description';
	if (done) {
		classNames += ' done completed';
	}

	return (
		<span className="todo-list">
			<input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
			{isEditing ? (
				<li className="editing">
					<input type="text" value={editedTask} onChange={whatIsEditing} onKeyDown={saveOnEnterKeyDown} className="edit" onSubmit={saveChangesEditing} autoFocus />
				</li>
			) : (
				<label className="todo-list-item" onClick={onToggleDone}>
					<span className={classNames}>{label}</span>
					<span className="created">{createTimestamp()}</span>
				</label>
			)}

			<div type="button" className="btn" onClick={beginEditing}>
				<i className="icon icon-edit" />
			</div>

			<div type="button" className="btn" onClick={onDeleted}>
				<i className="icon icon-destroy" />
			</div>
		</span>
	);
};

TodoListItem.defaultProps = {
	filter: 'all',
};

TodoListItem.propTypes = {
	filter: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onEdited: PropTypes.func.isRequired,
	onDeleted: PropTypes.func.isRequired,
	onToggleDone: PropTypes.func.isRequired,
	done: PropTypes.bool.isRequired,
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
