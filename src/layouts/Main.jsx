import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
