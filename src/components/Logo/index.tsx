import styles from "./styles.module.css";
import MyPomodoroLogo from "./icon/LogoIcon";
import { RouterLink } from "../RouterLink";

export function Logo() {
    return (
        <RouterLink className={styles.logoLink} href="/">
            <MyPomodoroLogo />
            <h1>my pomodoro</h1>
        </RouterLink>
    );
}