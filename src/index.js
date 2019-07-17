import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function MakeItem(prop) {
  let { item, isChecked } = prop.itemObj;

  let toShow = item.length > 50 ? item.slice(0, 45) + "..." : item;

  let strike = isChecked ? "strike" : "";
  return (
    <li key={prop.id}>
      <div className="tags has-addons todo-item">
        <input type="checkbox" className="check-box" onClick={prop.checkItem} />
        <span className={`tag is-primary is-large ${strike}`}>
          {toShow}
          <button className="delete is-medium" onClick={prop.onClickDelete} />
        </span>
      </div>
    </li>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { item: "Tweet", isChecked: false },
        { item: "Reflection", isChecked: false },
        { item: "Kata", isChecked: false },
        { item: "Commit", isChecked: false }
      ],
      todoitem: ""
    };
  }

  handleInput = e => {
    this.setState({ todoitem: e.target.value });
  };

  removeItem(i) {
    let newItem = this.state.todoList.slice();
    newItem.splice(i, 1);
    this.setState({ todoList: newItem });
  }

  addItem() {
    let task = this.state.todoitem;
    if (task.length > 0) {
      let newItem = this.state.todoList.slice();
      newItem.push({ item: task, isChecked: false });
      this.setState({ todoList: newItem });
      this.setState({ todoitem: "" });
    }
  }

  deleteAll() {
    this.setState({ todoList: [] });
  }

  checkItem(i) {
    let newItem = this.state.todoList.slice();
    newItem[i].isChecked = !this.state.todoList[i].isChecked;
    this.setState({ todoList: newItem });
  }

  render() {
    var listItems = [];
    this.state.todoList.forEach((itemObj, i) => {
      listItems.push(
        <MakeItem
          itemObj={itemObj}
          id = {i}
          onClickDelete={() => this.removeItem(i)}
          checkItem={() => this.checkItem(i)}
        />
      );
    });
    return (
      <div className="App box">
        <h1 className="title is-1 is-spaced">Todo List</h1>

        <div className="hero-field">
          <input
            className="input is-info todo-task"
            value={this.state.todoitem}
            type="input"
            onChange={this.handleInput}
          />
          <button
            className=" add-btn button is-info"
            onClick={() => this.addItem()}
          >
            Add
          </button>
          <button className="button is-danger" onClick={() => this.deleteAll()}>
            Delete All
          </button>
        </div>

        <ul>{listItems}</ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
