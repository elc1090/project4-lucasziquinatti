import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function BasePage() {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}