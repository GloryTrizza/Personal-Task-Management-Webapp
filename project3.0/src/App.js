import './App.css';
import { Col, Row } from 'antd';
import { useState, useEffect } from "react";
import Sections from './Sections'
import React from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const serverHost = 'http://localhost:4000';

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        dueDate: "",
        status: status,
      },
    ]);
  }

  async function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
    const url = serverHost + '/tasksFile';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(taskToAdd)
    }
    const response = await fetch(url, options);
    if(response.status === 200){
      console.log("Submitted!");
    }
  }


  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }
  return (
    <div className='App'>
      <h1>Task Management App</h1>
      <main>
        <Row>
          <Col span={8}>
            <Sections
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              status="Not Started"
            />
          </Col>
          <Col span={8}>
            <Sections
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              status="In Progress"
            />
          </Col>
          <Col span={8}>
            <Sections
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              status="Completed"
            />
          </Col>
        </Row>
      </main>
    </div>
  );
}

export default App;
