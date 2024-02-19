import style from './ThemeToggle.module.css'
import { useState, useEffect } from 'react';
import Sun from '../../assets/icon-sun.svg';
import Moon from '../../assets/icon-moon.svg';


const ThemeToggle = () => {
    const [theme, setTheme] = useState("light")
    
    const toggleTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
        console.log(theme)
    };


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div className={style.ThemeToggleMainContainer}>
            
            <div className={style.ThemeToggleDiv}>
                <h1>TODO</h1>
                <button onClick={toggleTheme}>
                    <img src={theme === "light" ? Moon : Sun} alt="Sun" />
                </button>
            </div>
        </div>
    )
}

export default ThemeToggle;