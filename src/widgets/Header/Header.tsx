import styles from "./header.module.scss"

export const Header = () => {
    return(
        <div className={styles.root}>
            <div>
                навигация
            </div>
            <div>
                фильтр
            </div>
        </div>
    )
}