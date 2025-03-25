import { Outlet } from "react-router-dom";
import Header from "../../common/sections/Header";
import Footer from "../../common/sections/Footer";

const MainPage = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainPage;
