import React, { useState } from "react";

const Home = () => {
  const [inputField, setInput] = useState(""); //Default.
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = () => {
    let newTasks = [...tasks];
    newTasks.push({
      label: inputField,
      done: false,
    });
	console.log("NewTask");
	console.log(newTasks);
    setTasks(newTasks);
    setInput("");
    console.log(tasks);
    fetch("http://assets.breatheco.de/apis/fake/todos/user/facundogds", {
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
            return <li key={index}>{task}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
