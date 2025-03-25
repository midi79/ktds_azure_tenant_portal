import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer__wrapper}>
            <div className={styles.footer__content}>
                <div className={styles.footer__contact}>KD DS Cloud사업본부 Cloud사업담당 Cloud사업2팀</div>
            </div>
        </footer>
    );
};

export default Footer;
