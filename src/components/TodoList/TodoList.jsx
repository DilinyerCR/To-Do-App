import style from './TodoList.module.css'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem'
// import CloseIcon from '../../assets/icon-cross.svg';


const TodoList = () => {

  const [inputValue, setInputValue] = useState("")

  const [tasks, setTasks] = useState([])



  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleAddTask = (event) => {
    event.preventDefault();
  
    if (inputValue.trim()) {
      const newTask = {
        text: inputValue,
        id: Date.now(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleCloseTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  const handleCompleted = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    const updatedTasks = tasks.map((task) => (task.id === id ? updatedTask : task));
    setTasks(updatedTasks);
  };
    

    // ! ====== Renderizado ======
    return (
      <div className={style.TodoListMainContainer}>
        <div className={style.TodoList}>
          <form>
            <button onClick={handleAddTask}></button>
            <input
              type="text"
              placeholder="Create a new todo..."
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if(event.key === 'Enter') {
                  handleAddTask(event)
                }
              }}
              value={inputValue}
            />
          </form>

          <div className={style.ListItemsContainer}>

            {tasks.map((task) => (
              <TodoItem 
              key={task.id}
              task={task}
              handleCloseTask={handleCloseTask}
              handleCompleted={handleCompleted}
              />
            ))}


            <div className={style.ActionsContainerOne}>
              <p>5 items left</p>
                <div className={style.DektopOptionscontainer}>
                  <button>All</button>
                  <button>Active</button>
                  <button>Completed</button>
                </div>
              <button>Clear Completed</button>


            </div>
          </div>

          <div className={style.ActionsContainerTwo}>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>

          <p className={style.DragAndDrop}>Drag and drop to reorder list</p>
        </div>
      </div>
    );
}

export default TodoList