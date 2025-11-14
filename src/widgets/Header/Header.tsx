import styles from "./header.module.scss"
import { Link } from "react-router-dom";

export const Header = () => {
    return(
        <header className={styles.root}>
            <nav className={styles.navigation}>
                <Link to="/list" className={styles.navLink}>Список тваров</Link>
                <Link to="/stats" className={styles.navLink}>Статистика модерации</Link>
            </nav>
         </header>
    )
}