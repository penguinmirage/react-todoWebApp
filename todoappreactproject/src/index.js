import React, { Component } from "react";
import PropTypes from "prop-types";
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
    todoData: [
      // { label: "Drink Coffee", important: false, id: 1 },
      // { label: "Make awesome App", important: true, id: 2 },
      // { label: "Build great applications", important: false, id: 3 },
    ],
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

console.log("Hello World, this program is working...");
root.render(<App />);

//   maxId = 100;
//
//   state = {
//     todoData: [{ label: "Drink Coffee", important: false, id: 1 }],
//     filter: "",
//     term: "",
//   };
//   //
//
//   createTodoItem(label) {
//     return {
//       label,
//       important: false,
//       done: false,
//       id: this.maxId++,
//     };
//   }
//
//   // Count todos
//   countTodos = () => {
//     return this.state.todoData.filter((task) => !task.done).length;
//   };
//
//   filter(items, filter) {
//     switch (filter) {
//       case "all":
//         return items;
//       case "active":
//         return items.filter((item) => !item.done);
//       case "completed":
//         return items.filter((item) => item.done);
//       default:
//         return items;
//     }
//   }
//
//   onFilterChange = (filter) => {
//     this.setState({ filter });
//   };
//
//   deleteItem = (id) => {
//     console.log(id);
//     this.setState(({ todoData }) => {
//       const idx = todoData.findIndex((el) => el.id === id);
//       todoData.splice(idx, 1);
//
//       const before = todoData.slice(0, idx);
//       const after = todoData.slice(idx + 1);
//       const newArray = [...before, ...after];
//
//       return {
//         todoData: newArray,
//       };
//     });
//   };
//
//   addItem = (text) => {
//     const newItem = this.createTodoItem(text);
//
//     // add element to an array
//     this.setState(({ todoData }) => {
//       const newArr = [...todoData, newItem];
//       return {
//         todoData: newArr,
//       };
//     });
//   };
//
//   toggleProperty(arr, id, propName) {
//     const idx = arr.findIndex((el) => el.id === id);
//     // 1. update object
//     const oldItem = arr[idx];
//     const newItem = { ...oldItem, [propName]: !oldItem[propName] };
//     return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
//   }
//
//   onToggleDone = (id) => {
//     this.setState(({ todoData }) => {
//       return {
//         todoData: this.toggleProperty(todoData, id, "done"),
//       };
//     });
//     console.log("Toggle done", id);
//   };
//
//   search(items, term) {
//     if (term.length === 0) {
//       return items;
//     }
//
//     return items.filter((item) => {
//       return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
//     });
//   }
//
//   onSearchChange = (term) => {
//     this.setState({ term });
//   };
//
//   render() {
//     const { todoData, filter, term } = this.state;
//     const visibleItems = this.filter(this.search(todoData, term), filter);
//
//     const doneCount = todoData.filter((el) => el.done).length;
//     const todoCount = todoData.length - doneCount;
//
//     return (
//       <div className="todoapp">
//         <AppHeader />
//         {/* <SearchPanel onSearchChange={this.onSearchChange} /> */}
//         <NewTaskForm className="new-todo" addItem={this.addItem} />
//         <div className="main">
//           <TaskList
//             todos={(visibleItems, this.state.todoData)}
//             onToggleDone={this.onToggleDone}
//             onDeleted={this.deleteItem}
//           />
//         </div>
//         <div className="footer">
//           <Footer className="todo-count" count={todoCount} />
//           <TasksFilter filter={filter} onFilterChange={this.onFilterChange} />
//         </div>
//       </div>
//     );
//   }
// }
//
// console.log("Hello World, this program is working...");
// root.render(<App />);
