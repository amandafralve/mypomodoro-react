import styles from "./styles.module.css";
import MyPomodoroLogo from "./icon/LogoIcon";

export function Logo() {
    return (
        <div className={styles.container}>
            <MyPomodoroLogo />
            <h1>my pomodoro</h1>
        </div>
    );
}