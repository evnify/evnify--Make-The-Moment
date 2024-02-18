import React from "react";
import { SideMenu, AdminRoutes, NavBar } from '../../components'

function AdminDashboard() {
    return <div className="AdminDashboardContainer">
        <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
                <NavBar />
                <AdminRoutes />
            </div>
        </div>
    </div>;
}

export default AdminDashboard;
