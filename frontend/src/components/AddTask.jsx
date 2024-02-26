import { useState } from "react";

export default function AddTask() {
  const [task, setTask] = useState("");
  const [addTask, setAddTask] = useState([]);

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleClick() {
    setAddTask((prevAddTask) => [...prevAddTask, task]);
    setTask("");
  }


  return (
    <>
      <h1>tasks</h1>
      <p>
        <input type="text" name="" id="" value={task} onChange={handleChange} />
        <button onClick={handleClick}>add task</button>
      </p>

      <p>
        {addTask.map((task, index) => (
          <li key={index}>{task}
          <button className=" mx-2 px-4">clear</button></li>
        ))}
       
      </p>
    </>
  );
}
