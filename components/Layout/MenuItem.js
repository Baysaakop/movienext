import styles from '../../styles/Menu.module.css'

const MenuItem = ({ icon, text }) => {
    return (        
        <div className={styles.menuItem}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.text}>
                {text}
            </div>
        </div>  
    )
}

export default MenuItem