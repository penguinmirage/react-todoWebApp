import React from 'react'

import Task from '../task'
import './task-list.css'

const TaskList = ({ todos, onDeleted, onToggleImportant, onToggleDone, onEdited }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onEdited={(editedLabel) => onEdited(id, editedLabel)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  })

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
