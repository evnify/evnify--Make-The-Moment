import React from "react";

function MainDashboard() {
    return (
        <div className="admin_dashboard_card_main_section">
            <div className="admin_dashboard_card card1">
                <h1>Upcoming Events</h1>
                <h2>10</h2>
                <h3>4+ than last week</h3>
            </div>
            <div className="admin_dashboard_card card2">
                <h1>Total Revenue</h1>
                <h2 style={{fontSize:"32px"}}>54000 LKR</h2>
            </div>
            <div className="admin_dashboard_card card3">
                <h1>Upcoming Events</h1>
                <h2>10</h2>
                <h3>4+ than last week</h3>
            </div>
        </div>
    );
}

export default MainDashboard;
