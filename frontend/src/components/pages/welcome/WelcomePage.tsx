import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import Button from "../../common/widget/Button";
import ktdsImg from "../../../assets/images/ktdslogo.png";
import azureImg from "../../../assets/images/ms_azure_logo_icon.png";

const ENV = import.meta.env.VITE_ENV;
let BASE_URL = "http://localhost:8090";

if (ENV === "dev" || ENV === "prd") {
    BASE_URL = import.meta.env.VITE_API_URL;
}

const WelcomePage = () => {

    const navigate = useNavigate();

    const onClickTologIn = () => {
      window.location.href = BASE_URL + "/auth/login";
    };

    const onClickToTemplogIn = () => {
      navigate("/pages/request");
    };

    return (
      <div className={styles.welcome__wrapper}>
        <div className={styles.welcome__img}>
                <img src={ktdsImg} />
            <span>&</span>
            <img src={azureImg} />
        </div>
        <h1 className={styles.welcome__title}>KT DS Azure Tenant Portal</h1>
        <p className={styles.welcome__subtitle}>KT DS Azure Tenant Portal에 오신 것을 환영합니다. <br/>Azure 로그인 후 사용 가능합니다.</p>        
        <div className={styles.welcome__buttons}>
            <Button onClick={onClickTologIn}  title="Azure 로그인"/>
            <Button onClick={onClickToTemplogIn}  title="게시판 바로가기"/>            
        </div>
      </div>
    );
  };

export default WelcomePage;