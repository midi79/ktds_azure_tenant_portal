import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import ktdsLogoImage from "../../../assets/images/ktdslogo.png";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../util/http";
import { useEffect } from "react";
import useUserInfo from "../store/user";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { url: "request", title: "신청" },
    { url: "qna", title: "Q&A" },
  ];

  const { user, setUser } = useUserInfo();

  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  const onTitleClickHandler = (): void => {
    navigate("/");
  };

  const onMenuClickHandler = (menu: string) => {
    const page = menu.toLowerCase();
    navigate(`/pages/${page}`);
  };

  const isActive = (url: string) => {
    if (url === "request") {
      return location.pathname === "/" || location.pathname.includes("request");
    }
    return location.pathname.includes(url);
  };

  useEffect(() => {
    if (userInfo) setUser(userInfo);
  }, [userInfo, setUser]);

  return (
    <header className={styles.header__wrapper}>
      <div className={styles.header__title} onClick={onTitleClickHandler}>
        <img src={ktdsLogoImage} alt="KT DS" />
        <p>Azure Tenant 신청 Portal</p>
      </div>
      <nav className={styles.nav__wrapper}>
        {menus.map(({ url, title }) => (
          <span
            key={url}
            className={`${styles.nav__menu} ${
              isActive(url) ? styles.active : ""
            }`}
            onClick={() => onMenuClickHandler(url)}
          >
            {title}
          </span>
        ))}
      </nav>
      <div className={styles.header__user}>
        로그인 유저 :ㅤ<span>{user?.name}</span>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading user data</p>}
    </header>
  );
};

export default Header;
