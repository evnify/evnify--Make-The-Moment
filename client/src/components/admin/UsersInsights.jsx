import React from "react";
import UserTab from "./UserTab";
import UserTable from "./UserTable";

function UsersInsights() {
    return (
        <>
            <div className="admin_user_welcome">
            </div>
            <div className="UsersInsights">
                <UserTab />
            </div>

            <div className="chart_container">
                <div className="admin_user_chart1"></div>

                <div className="admin_user_chart2"></div>
            </div>

            <div className="admin_user_list">
                <UserTable/>
            </div>
        </>
    );
}

export default UsersInsights;
