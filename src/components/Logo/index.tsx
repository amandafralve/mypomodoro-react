import styles from "./styles.module.css";
import MyPomodoroLogo from "./icon/LogoIcon";

export function Logo() {
    return (
        <a className={styles.logoLink} href="#">
            <MyPomodoroLogo />
            <h1>my pomodoro</h1>
        </a>
    );
}