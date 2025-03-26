import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer__wrapper}>
            <div className={styles.footer__content}>
                <div className={styles.footer__contact}>담당자 : KD DS Cloud사업2팀 장선후 전임 (jang.sh@kt.com)</div>
            </div>
        </footer>
    );
};

export default Footer;
