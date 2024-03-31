import React from "react";

function EmployeeList() {
    return (
        <div style={{display : "flex", flexDirection: "column"}}>
            <div className="admin_employee_list_hero_container">
                <div className="admin_employee_list_cards">
                    <div className="admin_emp_details_card card1">
                        <h1>Total Employees</h1>
                        <h2>568</h2>
                    </div>
                    <div className="admin_emp_details_card card2">
                        <h1>Pending Leaves</h1>
                        <h2>26</h2>
                    </div>
                </div>
                <div className="admin_emp_pending_leave_container">

                </div>
                <div className="admin_emp_upcoming_event_container">
                    
                </div>
            </div>
            <div className="admin_emp_list_container">
                
            </div>
        </div>
    );
}

export default EmployeeList;
