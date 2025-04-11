import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer__wrapper}>
            <div className={styles.footer__content}>
                <div className={styles.footer__contact}> 📌 Cloud사업2팀 📌</div>                
            </div>
        </footer>
    );
};


export default Footer;
