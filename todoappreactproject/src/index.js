import React, { Component } from "react";
import AppHeader from "./components/app-header/app-header";
import TaskList from "./components/task-list/task-list";
import TasksFilter from "./components/tasks-filter";
import NewTaskForm from "./components/new-task-form";
import Footer from "./components/app-footer";
import "./index.css";
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [{ label: "Your first task", important: false, id: 1 }],
  };
  //
  // Count todos
  countTodos = () => {
    return this.state.todoData.filter((task) => !task.done).length;
  };

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

  addItem = (addedText) => {
    // console.log("added", text);
    // geerate id
    const newItem = {
      label: addedText,
      important: false,
      done: false,
      id: this.maxId++,
    };

    // add element to an array
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    return (
      <div className="todoapp">
        <AppHeader />
        <NewTaskForm className="new-todo" addItem={this.addItem} />
        <div className="main">
          <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} />
        </div>
        <div className="footer">
          <Footer className="todo-count" count={this.countTodos()} />
          <TasksFilter className="filters" />
        </div>
      </div>
    );
  }
}

console.log("Hello World, this program is working...");
root.render(<App />);
