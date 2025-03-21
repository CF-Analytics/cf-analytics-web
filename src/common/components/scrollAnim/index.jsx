import styles from './index.module.scss';

const ScrollAnimComponent = ({className}) => {
    return (
        <div className={`${styles.scrollAnimComponent} ${className}`}>
            <div className={styles.scrollAnim}>
                <div className={styles.chevron}></div>
                <div className={styles.chevron}></div>
                <div className={styles.chevron}></div>
            </div>
        </div>
    )
}

export default ScrollAnimComponent;