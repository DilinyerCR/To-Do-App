import style from "./TodoItem.module.css";
import CloseIcon from '../../assets/icon-cross.svg';
import CheckIcon from '../../assets/icon-check.svg'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoItem = ({ task, handleCloseTask, handleCompleted, all }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id : task.id
    })

    const dndStyles = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div className={style.Main}>
            
            <div className={style.CheckButtonMainContainer}>
              <div className={style.BackButton}>
                <button
                  className={style.Circle}
                  onClick={() => handleCompleted(task.id)}
                  style={{
                    background: task.completed
                      ? `linear-gradient(130deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))`
                      : "var(--Very-Dark-Desaturated-Blue)",
                  }}
                >
                  {task.completed ? (
                    <img src={CheckIcon} alt="CheckIconON" />
                  ) : (
                    <img src="" alt="" />
                  )}
                </button>
              </div>
            </div>
            
            <div
              style={dndStyles}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              className={style.Items}
              key={task.id}
            >
              <div className={style.div1}>
                <p
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed
                      ? "var(--Very-Dark-Grayish-Blue-1)"
                      : "var(--Light-Grayish-Blue)",
                  }}
                >
                  {task.text}
                </p>
              </div>
            </div>

            <div>
              <button
                className={style.CloseIcon}
                onClick={() => handleCloseTask(task.id)}
                style={{ display: all ? "block" : "none" }}
              >
                <img src={CloseIcon} alt="CloseIcon" />
              </button>
            </div>

        </div>
    );
};

export default TodoItem
