import React from "react";
import { EmpRoutes, EmpSideMenu, EmpHero } from "../../components";

function EmpDashboard() {
    return (
        <div className="Emp_DashboardContainer">
            <div className="Emp_SideMenuAndPage_Content">
                <div style={{position: "absolute"}}>
                    <EmpSideMenu />
                </div>
                <div className="Emp_Page_Content">
                    <EmpHero />
                    <EmpRoutes />
                </div>
            </div>
        </div>
    );
}

export default EmpDashboard;
