import style from './TodoList.module.css'
import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem'


const TodoList = () => {

  const [inputValue, setInputValue] = useState("")

  const [tasks, setTasks] = useState([])

  const [allTasks, setAllTasks] = useState([])

  const [itemLeft, setItemLeft] = useState(0)

  const [activeButton, setActiveButton] = useState(false)
  const [completedButton, setCompletedButton] = useState(false)
  const [all, setAll] = useState(true)


  // ? ===Funciones===
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
    // Agregar tareas
  const handleAddTask = (event) => {
    event.preventDefault();
  
    if (inputValue.trim()) {
      const newTask = {
        text: inputValue,
        id: Date.now(),
        completed: false
      };
      setAllTasks([...allTasks, newTask]);
      setTasks([...allTasks, newTask]);
      setInputValue("");
      setItemLeft(itemLeft + 1)
    }
  };

  // Cerrar tareas
  const handleCloseTask = (id) => {
    const taskToRemove = tasks.find((task) => task.id === id);

    if (!taskToRemove.completed) {
      setItemLeft((prevItemLeft) => prevItemLeft - 1);
    }

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setAllTasks(updatedTasks);
    setTasks(updatedTasks);
  };
  
  // Marcar tareas como completadas
  const handleCompleted = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    const updatedTasks = tasks.map((task) => (task.id === id ? updatedTask : task));
  
    const changeInItemLeft = updatedTask.completed ? -1 : 1;
  
    setItemLeft((prevItemLeft) => prevItemLeft + changeInItemLeft);
    setAllTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const filterActiveTasks = () => {
    const activeTasks = allTasks.filter((task) => !task.completed);
    setTasks(activeTasks);
    if(!activeButton ) {
      setActiveButton(true)
      setCompletedButton(false)
      setAll(false)
    } 
  }

  const filterCompletedTasks = () => {
    const completedTasks = allTasks.filter((task) => task.completed === true);
    setTasks(completedTasks);
    if(!completedButton) {
      setCompletedButton(true);
      setActiveButton(false)
      setAll(false)
    }
  }

  const clearCompletedTasks = () => {
    const clearCompleted = allTasks.filter((task) => !task.completed);
    setAllTasks(clearCompleted);

    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  }

  const asd = () => {
    const clearCompleted = allTasks.filter((task) => !task.completed);
    setAllTasks(clearCompleted);
    // Modificado aquí para mantener las tareas activas en la lista de tareas mostradas
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  }


  
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
              all={all}
              />
            ))}


            <div className={style.ActionsContainerOne}>
              <p>{itemLeft} items left</p>
                <div className={style.DektopOptionscontainer}>
                  <button onClick={() => { setTasks(allTasks), setAll(true), setCompletedButton(false), setActiveButton(false) }} 
                  style={{color: all ? 'var(--Bright-Blue)' : 'var(--Dark-Grayish-Blue)'}}>All</button>

                  <button onClick={filterActiveTasks}
                  style={{color: activeButton ? 'var(--Bright-Blue)' : 'var(--Dark-Grayish-Blue)'}}>Active</button>

                  <button onClick={filterCompletedTasks} 
                  style={{color: completedButton ? 'var(--Bright-Blue)' : 'var(--Dark-Grayish-Blue)'}}>Completed</button>
                </div>
              <button onClick={clearCompletedTasks}>Clear Completed</button>


            </div>
          </div>

          <div className={style.ActionsContainerTwo}>
            <button onClick={() => { setTasks(allTasks), setAll(true), setCompletedButton(false), setActiveButton(false) }} 
            style={{color: all ? 'var(--Bright-Blue)' : 'var(--Dark-Grayish-Blue)'}}>All</button>

            <button onClick={filterActiveTasks}
            style={{color: activeButton ? 'var(--Bright-Blue)' : 'var(--Dark-Grayish-Blue)'}}>Active</button>

            <button onClick={filterCompletedTasks} 
            style={{color: completedButton ? 'var(--Bright-Blue)' : 'var(--Dark-Grayish-Blue)'}}>Completed</button>
          </div>

          <p className={style.DragAndDrop}>Drag and drop to reorder list</p>
        </div>
      </div>
    );
}

export default TodoList