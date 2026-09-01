import { MoveRight } from "lucide-react"
import styles from "./styles.module.css"
import { RouterLink } from "../RouterLink"

export function Footer(){
    return (
        <footer className={styles.footer}>
            <RouterLink href="/about-pomodoro">
                ENTENDA COMO FUNCIONA A TÉCNICA POMODORO
                <MoveRight/>
            </RouterLink>
            <RouterLink href="#">
                My Pomodoro &copy; {new Date().getFullYear()} - Amanda Freitas
            </RouterLink>
        </footer> 
    )
}