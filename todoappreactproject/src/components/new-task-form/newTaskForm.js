// новая версия на хуке useState
import React, { useState } from 'react';
import './newTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label.trim() !== '') {
      addItem(label);
      setLabel(''); // Reset input after adding the item
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        onChange={onLabelChange}
        placeholder="What needs to be done?"
        value={label}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  defaultLabel: 'Empty task added',
};

NewTaskForm.propTypes = {
  defaultLabel: PropTypes.string,
  addItem: PropTypes.func.isRequired,
};

export default NewTaskForm;

// Предыдущая версия на класс-компоненте:
//
// import React, { Component } from 'react';
// import './newTaskForm.css';
// import PropTypes from 'prop-types';
//
// export default class NewTaskForm extends Component {
//   state = {
//     label: '',
//   };
//
//   onLabelChange = (e) => {
//     this.setState({
//       label: e.target.value,
//     });
//   };
//
//   onSubmit = (e) => {
//     e.preventDefault();
//     if (this.state.label.trim() !== '') {
//       this.props.addItem(this.state.label);
//       this.setState({
//         label: '',
//       });
//     }
//   };
//
//   onEdit = (e) => {
//     e.preventDefault();
//   };
//
//   render() {
//     return (
//       <form onSubmit={this.onSubmit}>
//         <input
//           type="text"
//           className="new-todo"
//           onChange={this.onLabelChange}
//           placeholder="What needs to be done?"
//           value={this.state.label}
//         />
//       </form>
//     );
//   }
// }
//
// NewTaskForm.defaultProps = {
//   defaultLabel: 'Empty task added',
// };
//
// NewTaskForm.propTypes = {
//   defaultLabel: PropTypes.string,
//   addItem: PropTypes.func.isRequired,
// };
