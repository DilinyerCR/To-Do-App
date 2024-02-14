import style from './ThemeToggle.module.css'
import Sun from '../../assets/icon-sun.svg'

const ThemeToggle = () => {
    return (
        <div className={style.ThemeToggleMainContainer}>
            <div className={style.ThemeToggleDiv}>
                <h1>TODO</h1>
                <button>
                    <img src={Sun} alt="Sun" />
                </button>
            </div>
        </div>
    )
}

export default ThemeToggle;