import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTab() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get("/api/users/getUser");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate counts for each user type
    const getCountForUserType = (userType) => {
        return users.filter(user => user.type === userType).length;
    };

    return (
        <div className="admin_user_list_hero_container">
            <div className="admin_user_list_cards">
                <div className="admin_user_details_card card1">
                    <h1>All Users</h1>
                    <h2>{users.length}</h2>
                </div>
                <div className="admin_user_details_card card2">
                    <h1>Employee</h1>
                    <h2>{users.filter(user => user.userType === "Employee").length}</h2>
                    
                </div>

                <div className="admin_user_details_card card3">
                    <h1>Customer</h1>
                    <h2>{users.filter(user => user.userType === "Customer").length}</h2>


                </div>

                <div className="admin_user_details_card card4">
                    <h1>Manager</h1>
                    <h2>{users.filter(user => user.userType === "Hr-Manager").length}</h2>

                </div>

                <div className="admin_user_details_card card5">
                    <h1>Admin</h1>
                    <h2>{users.filter(user => user.userType === "Admin").length}</h2>
                </div>
            </div>
        </div>
    );
}

export default UserTab;
