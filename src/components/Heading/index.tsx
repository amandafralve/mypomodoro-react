
import styles from './styles.module.css'

type HeadingProps = {
    children: React.ReactNode;

}

export function Heading({children}: HeadingProps) {
    return <p className={styles.heading}>{children}</p>
}