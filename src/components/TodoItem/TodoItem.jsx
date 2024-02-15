import style from "./TodoItem.module.css";
import CloseIcon from '../../assets/icon-cross.svg';
import CheckIcon from '../../assets/icon-check.svg'

const TodoItem = ({ task, handleCloseTask, handleCompleted }) => {

    return (
        <div className={style.Items} key={task.id}>
            <div className={style.div1}>
                <div className={style.BackButton}
                >
                    <button className={style.Circle} 
                    onClick={()=>handleCompleted(task.id)}
                    style={{
                        background: task.completed
                        ? `linear-gradient(130deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))`
                        : 'var(--Very-Dark-Desaturated-Blue)'
                    }}
                    >
                        {task.completed ? <img src={CheckIcon} alt="CheckIconON"/> : <img src='' alt=""/>}
                    </button> 
                </div>
                <p 
                style={{textDecoration: task.completed ? 'line-through' : 'none', 
                color: task.completed ? 'var(--Very-Dark-Grayish-Blue-1)' : 'var(--Light-Grayish-Blue)'}}>{task.text}</p>
            </div>

            <div>
                <button className={style.CloseIcon} onClick={()=>handleCloseTask(task.id)}>
                    <img src={CloseIcon} alt="CloseIcon" />
                </button>
            </div>
        </div>
    );
};

export default TodoItem
