import { Outlet } from "react-router-dom";
import NavComponent from "./assets/components/nav";
export default function Layout(){
    return(
        <div className="layout">
            <NavComponent/>
            <Outlet/>
        </div>
    );
}