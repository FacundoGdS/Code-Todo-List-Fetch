import React, { useState, useEffect } from "react";
const Home = () => {
  const [inputField, setInput] = useState(""); //Default.
  const [tasks, setTasks] = useState([]);
  const addTaskHandler = (e) => {
    e.preventDefault();
    let newTasks = [...tasks, {
      label: inputField,
      done: false,
    }];
    setTasks(newTasks);
    setInput("");
    console.log("Task");
    console.log(tasks);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/facundogds", {
      method: "PUT",
      body: JSON.stringify(newTasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
  .then((response)=>{
    console.log("status");
    console.log(response.status);
    return response.json();
  })
  .then((data) => {
    console.log("data");
    console.log(data);
  })
  .catch((error) => {
    console.log("error");
    console.log(error);
  });
  };
  const inputChangeHandler = (event) => {
    //Seteo continuo.
    setInput(event.target.value);
    console.log(event.target.value);
  };
  useEffect(()=>{
    fetch("https://assets.breatheco.de/apis/fake/todos/user/facundogds", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setTasks(data);
      console.log("Task");
      console.log(tasks);
    })
    .catch((error)=>{
      console.log(error);
    });
  }, []);
  return (
    <>
      <div className="text-center">
        <h1>Todo-list</h1>
        <div>
          <input
            onChange={inputChangeHandler}
            type="text"
            placeholder="Write a task"
            value={inputField}
          />
          <button onClick={addTaskHandler}>Add task</button>
        </div>
      </div>
      <div className="text-center">
        <ul>
          {tasks.map((task, index) => {
            return <li key={index}>{task.label}</li>;
          })}
        </ul>
      </div>
    </>
  );
};
export default Home;
