import React, { useEffect, useState } from "react";
import { Tag, Progress } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function EmpDashboard() {
    const [emp, setEmp] = useState("");
    const [pendingLeaves, setPendingLeaves] = useState([{}]);
    // Fetch leaves
    const fetchLeaves = async () => {
        const emp = JSON.parse(localStorage.getItem("currentUser"));
        try {
            const employee = await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/getEmployeeByUserID`,
                {
                    userID: emp.userID,
                }
            );

            setEmp(employee.data.empID);
            var id = employee.data.empID;
            const leaveData = await axios.post(
                `${process.env.PUBLIC_URL}/api/leaves/getLeaveByEmpID`,
                {
                    empID: employee.data.empID,
                }
            );
            const temp = leaveData.data.filter(
                (item) => item.status === "Pending"
            );
            console.log(temp);
            setPendingLeaves(temp);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const formatDatefunc = (date) => {
        const createdAtDate = new Date(date);
        const formattedDate = createdAtDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        return formattedDate;
    };

    return (
        <div className="employee_dashboard_hero">
            <div className="emp_dashboard_main_container"></div>
            <div>
                <div className="emp_dashboard_pending_laves_container">
                    <div>
                        <h1>Pending Leave Requests</h1>
                        {pendingLeaves.length > 0 ? (
                            pendingLeaves.slice(0, 4).map((item) => (
                                <div className="emp_dashboard_pending_lave_rows">
                                    <h5>{formatDatefunc(item.createdAt)}</h5>
                                    <Tag color="orange">Pending</Tag>
                                </div>
                            ))
                        ) : (
                            <div
                                className="center"
                                style={{ marginTop: "80px" }}
                            >
                                <h6 style={{ color: "#8d93a5" }}>
                                    No Pending Leave Requests
                                </h6>
                            </div>
                        )}
                    </div>

                    <Link to="/employee/leaves">
                        <p>See All Requests</p>
                    </Link>
                </div>
                <div className="emp_dashboard_leave_balance_container">
                    <Progress
                        type="circle"
                        strokeWidth={10}
                        strokeColor={"#4F46E5"}
                        strokeLinecap="square"
                        percent={75}
                        format={(percent) => <span>04/14</span>}
                    />
                    <div className="emp_dashboard_leave_balance_container_right">
                        <h4>Casual leave</h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexDirection: "center",
                                gap: "12px",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                            >
                                <circle
                                    cx="8.49343"
                                    cy="8.074"
                                    r="7.90554"
                                    fill="#f0f0f0"
                                />
                            </svg>
                            <h5>Remaining - 3</h5>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexDirection: "center",
                                gap: "12px",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                            >
                                <circle
                                    cx="8.49343"
                                    cy="8.73904"
                                    r="7.90554"
                                    fill="#4F46E5"
                                />
                            </svg>
                            <h5>Used - 4</h5>
                        </div>
                    </div>
                </div>
                <div className="emp_dashboard_leave_balance_container">
                    <Progress
                        type="circle"
                        strokeWidth={10}
                        strokeColor={"#4F46E5"}
                        strokeLinecap="square"
                        percent={75}
                        format={(percent) => <span>04/14</span>}
                    />
                    <div className="emp_dashboard_leave_balance_container_right">
                        <h4>Sick leave</h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexDirection: "center",
                                gap: "12px",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                            >
                                <circle
                                    cx="8.49343"
                                    cy="8.074"
                                    r="7.90554"
                                    fill="#f0f0f0"
                                />
                            </svg>
                            <h5>Remaining - 3</h5>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexDirection: "center",
                                gap: "12px",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                            >
                                <circle
                                    cx="8.49343"
                                    cy="8.73904"
                                    r="7.90554"
                                    fill="#4F46E5"
                                />
                            </svg>
                            <h5>Used - 4</h5>
                        </div>
                    </div>
                </div>
                <div className="emp_dashboard_leave_balance_container">
                    <Progress
                        type="circle"
                        strokeWidth={10}
                        strokeColor={"#4F46E5"}
                        strokeLinecap="square"
                        percent={75}
                        format={(percent) => <span>04/14</span>}
                    />
                    <div className="emp_dashboard_leave_balance_container_right">
                        <h4>Half leave</h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexDirection: "center",
                                gap: "12px",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                            >
                                <circle
                                    cx="8.49343"
                                    cy="8.074"
                                    r="7.90554"
                                    fill="#f0f0f0"
                                />
                            </svg>
                            <h5>Remaining - 3</h5>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexDirection: "center",
                                gap: "12px",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                            >
                                <circle
                                    cx="8.49343"
                                    cy="8.73904"
                                    r="7.90554"
                                    fill="#4F46E5"
                                />
                            </svg>
                            <h5>Used - 4</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpDashboard;
