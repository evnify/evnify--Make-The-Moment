import React from "react";
import { SideMenu, AdminRoutes ,NavBar } from '../../components'

function AdminDashboard() {
    return <div className="Admin_DashboardContainer">
        <div className="Admin_SideMenuAndPageContent">
            <SideMenu />
            <div className="Admin_PageContent">
                <NavBar />
                <AdminRoutes />
            </div>
        </div>
    </div>;
}

export default AdminDashboard;
