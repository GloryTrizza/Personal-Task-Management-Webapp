import Task from "./Task";
import { Button } from 'antd';

export default function Sections(props) {
    const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;
  
    let taskList, tasksForStatus;
  
    function handleAddEmpty() {
      addEmptyTask(status);
    }
  
    if (tasks) {
      tasksForStatus = tasks.filter((task) => {
        return task.status === status;
      });
    }
  
    if (tasksForStatus) {
      taskList = tasksForStatus.map((task) => {
        return (
          <Task
            addTask={(task) => addTask(task)}
            deleteTask={(id) => deleteTask(id)}
            moveTask={(id, status) => moveTask(id, status)}
            key={task.id}
            task={task}
          />
        );
      });
    }
  
    return (
      <div>
        <h3>{status}</h3>
        {taskList}
        <Button onClick={handleAddEmpty} type="primary">Add Task</Button>
      </div>
    );
  }
  