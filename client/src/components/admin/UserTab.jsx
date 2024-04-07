import React from "react";

function UserTab() {
    return (
        <div className="admin_user_list_hero_container">
            <div className="admin_user_list_cards">
                <div className="admin_user_details_card card1">
                    <h1>All Users</h1>
                    <h2>568</h2>
                </div>
                <div className="admin_user_details_card card2">
                    <h1>New Users</h1>
                    <h2>26</h2>
                </div>

                <div className="admin_user_details_card card3">
                    <h1>Customer</h1>
                    <h2>26</h2>
                </div>

                <div className="admin_user_details_card card4">
                    <h1>Manager</h1>
                    <h2>26</h2>
                </div>


                <div className="admin_user_details_card card5">
                    <h1>Admin</h1>
                    <h2>26</h2>
                </div>
            </div>
        </div>
    );
}

export default UserTab;
