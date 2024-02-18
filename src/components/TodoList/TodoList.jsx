import style from './TodoList.module.css';
import { useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [itemLeft, setItemLeft] = useState(0);

  const [activeButton, setActiveButton] = useState(false);
  const [completedButton, setCompletedButton] = useState(false);
  const [all, setAll] = useState(true);

  // ? ===Funciones===
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // Agregar tareas
  const handleAddTask = (event) => {
    event.preventDefault();

    if (inputValue.trim()) {
      const newTask = {
        text: inputValue,
        id: Date.now(),
        completed: false,
      };
      setAllTasks([...allTasks, newTask]);
      setTasks([...allTasks, newTask]);
      setInputValue("");
      setItemLeft(itemLeft + 1);
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

    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );

    const changeInItemLeft = updatedTask.completed ? -1 : 1;

    setItemLeft((prevItemLeft) => prevItemLeft + changeInItemLeft);
    setAllTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const filterActiveTasks = () => {
    const activeTasks = allTasks.filter((task) => !task.completed);
    setTasks(activeTasks);
    if (!activeButton) {
      setActiveButton(true);
      setCompletedButton(false);
      setAll(false);
    }
  };

  const filterCompletedTasks = () => {
    const completedTasks = allTasks.filter((task) => task.completed === true);
    setTasks(completedTasks);
    if (!completedButton) {
      setCompletedButton(true);
      setActiveButton(false);
      setAll(false);
    }
  };

  const clearCompletedTasks = () => {
    const clearCompleted = allTasks.filter((task) => !task.completed);
    setAllTasks(clearCompleted);

    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setTasks((tasks) => {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)

      const newIndex = tasks.findIndex((task) => task.id === over.id)
      
      return arrayMove(tasks, oldIndex, newIndex)
    })
  }

  // ! ====== Renderizado ======
  return (

    <DndContext 
    collisionDetection={closestCenter} 
    onDragEnd={handleDragEnd}
    >

      <div className={style.TodoListMainContainer}>
        <div className={style.TodoList}>
          <form>
            <button onClick={handleAddTask}></button>
            <input
              type="text"
              placeholder="Create a new todo..."
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddTask(event);
                }
              }}
              value={inputValue}
            />
          </form>

          <div className={style.ListItemsContainer}>

            <SortableContext
            items={tasks} 
            strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  handleCloseTask={handleCloseTask}
                  handleCompleted={handleCompleted}
                  all={all}
                />
              ))}
            </SortableContext>

            <div className={style.ActionsContainerOne}>
              <p>{itemLeft} items left</p>
              <div className={style.DektopOptionscontainer}>
                <button
                  className={style.buttonall}
                  onClick={() => {
                    setTasks(allTasks),
                      setAll(true),
                      setCompletedButton(false),
                      setActiveButton(false);
                  }}
                  style={{
                    color: all
                      ? "var(--Bright-Blue)"
                      : "var(--Dark-Grayish-Blue)",
                      transition: "color 0.4s"
                  }}
                  onMouseEnter={(event) => {
                    if (!all) {
                        event.target.style.color = "var(--Very-Light-Grayish-Blue)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = all ? "var(--Bright-Blue)" : "var(--Dark-Grayish-Blue)";
                }}
                >
                  All
                </button>
                
                <button
                  onClick={filterActiveTasks}
                  style={{
                    color: activeButton
                      ? "var(--Bright-Blue)"
                      : "var(--Dark-Grayish-Blue)",
                      transition: "color 0.4s"
                  }}
                  onMouseEnter={(event) => {
                    if (!activeButton) {
                        event.target.style.color = "var(--Very-Light-Grayish-Blue)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = activeButton ? "var(--Bright-Blue)" : "var(--Dark-Grayish-Blue)";
                }}
                >
                  Active
                </button>

                <button
                  onClick={filterCompletedTasks}
                  style={{
                    color: completedButton
                      ? "var(--Bright-Blue)"
                      : "var(--Dark-Grayish-Blue)",
                      transition: "color 0.3s"
                  }}
                  onMouseEnter={(event) => {
                    if (!completedButton) {
                        event.target.style.color = "var(--Very-Light-Grayish-Blue)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = completedButton ? "var(--Bright-Blue)" : "var(--Dark-Grayish-Blue)";
                }}
                >
                  Completed
                </button>
              </div>

              <button onClick={clearCompletedTasks}>Clear Completed</button>

            </div>


          </div>

          <div className={style.ActionsContainerTwo}>
          <button
                  className={style.buttonall}
                  onClick={() => {
                    setTasks(allTasks),
                      setAll(true),
                      setCompletedButton(false),
                      setActiveButton(false);
                  }}
                  style={{
                    color: all
                      ? "var(--Bright-Blue)"
                      : "var(--Dark-Grayish-Blue)",
                      transition: "color 0.4s"
                  }}
                  onMouseEnter={(event) => {
                    if (!all) {
                        event.target.style.color = "var(--Very-Light-Grayish-Blue)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = all ? "var(--Bright-Blue)" : "var(--Dark-Grayish-Blue)";
                }}
                >
                  All
                </button>
                
                <button
                  onClick={filterActiveTasks}
                  style={{
                    color: activeButton
                      ? "var(--Bright-Blue)"
                      : "var(--Dark-Grayish-Blue)",
                      transition: "color 0.4s"
                  }}
                  onMouseEnter={(event) => {
                    if (!activeButton) {
                        event.target.style.color = "var(--Very-Light-Grayish-Blue)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = activeButton ? "var(--Bright-Blue)" : "var(--Dark-Grayish-Blue)";
                }}
                >
                  Active
                </button>

                <button
                  onClick={filterCompletedTasks}
                  style={{
                    color: completedButton
                      ? "var(--Bright-Blue)"
                      : "var(--Dark-Grayish-Blue)",
                      transition: "color 0.3s"
                  }}
                  onMouseEnter={(event) => {
                    if (!completedButton) {
                        event.target.style.color = "var(--Very-Light-Grayish-Blue)";
                    }
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = completedButton ? "var(--Bright-Blue)" : "var(--Dark-Grayish-Blue)";
                }}
                >
                  Completed
                </button>
          </div>
          <p className={style.DragAndDrop}>Drag and drop to reorder list</p>
        </div>
      </div>
    </DndContext>

  );
};

export default TodoList;