import React from "react";
import {EmpRoutes, EmpSideMenu } from "../../components";

function EmpDashboard() {
    return (
        <div className="Emp_DashboardContainer">
            <div className="Emp_SideMenuAndPageContent">
                <EmpSideMenu />
                <div className="Emp_PageContent">
                    <EmpRoutes />
                </div>
            </div>
        </div>
    );
}

export default EmpDashboard;
