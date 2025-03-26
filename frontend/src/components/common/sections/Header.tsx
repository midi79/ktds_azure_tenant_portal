import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import ktdsLogoImage from "../../../assets/images/ktdslogo.png";

const Header = () => {
    const navigate = useNavigate();
    const menus = [
                   {"url":"request", "title":"신청"}, 
                   {"url":"qna", "title":"Q&A"}
                ];
    
    const onTitleClickHandler = (): void => {
        navigate("/");
    };

    const onMenuClickHandler = (menu: string) => {
        const page = menu.toLowerCase();
        navigate(`/pages/${page}`);
    };

    return (
        <header className={styles.header__wrapper}>
            <div className={styles.header__title} onClick={onTitleClickHandler}>
                <img src={ktdsLogoImage} alt="KT DS" />
                <p>Azure Tenant 신청 Portal</p>
            </div>
            <nav className={styles.nav__wrapper}>
                {menus.map((menu) => (
                    <span key={menu.url} className={styles.nav__menu} onClick={() => onMenuClickHandler(menu.url)}>
                        {menu.title}
                    </span>
                ))}
            </nav>            
        </header>
    );
};

export default Header;
