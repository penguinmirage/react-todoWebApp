import React, { Component } from "react";
import AppHeader from "../app-header/";
import TaskList from "../task-list";
import TasksFilter from "../tasks-filter";
import NewTaskForm from "../new-task-form";
import Footer from "../app-footer";
import "./app.css";
import PropTypes from "prop-types";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
    term: "",
    filter: "",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    console.log(id);
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      todoData.splice(idx, 1);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...before, ...after];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  editItem = (id, editedItem) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      todoData.splice(idx, 1);
      const oldDataFile = todoData[idx];
      const updatedDataFile = { ...oldDataFile, label: editedItem };
      const updatedTodoDataArray = [
        ...todoData.slice(0, idx),
        updatedDataFile,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: updatedTodoDataArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
    console.log("Toggle done", id);
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onCleared = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => !item.done);
      return {
        todoData: newTodoData,
      };
    });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todoapp">
        <AppHeader />
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onEdited={this.editItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <div className="footer">
          <Footer count={todoCount} />
          <TasksFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
            onCleared={this.onCleared}
          />
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  todoData: [],
  filter: "all",
};

App.propTypes = {
  todoData: PropTypes.array,
  filter: PropTypes.string,
};
