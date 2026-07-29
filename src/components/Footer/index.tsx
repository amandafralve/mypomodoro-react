import { MoveRight } from "lucide-react"
import styles from "./styles.module.css"

export function Footer(){
    return (
        <footer className={styles.footer}>
            <a href="#">
                ENTENDA COMO FUNCIONA A TÉCNICA POMODORO
                <MoveRight/>
            </a>
            <a href="#">
                My Pomodoro &copy; {new Date().getFullYear()} - Amanda Freitas
            </a>
        </footer> 
    )
}