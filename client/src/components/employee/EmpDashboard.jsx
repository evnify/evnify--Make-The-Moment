import React, { useEffect, useState } from "react";
import { Tag, Progress } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../admin/Loader";

function EmpDashboard() {
    const [emp, setEmp] = useState("");
    const [employee, setEmployee] = useState();
    const [pendingLeaves, setPendingLeaves] = useState([{}]);
    const [upcomingEvents, setUpcomingEvents] = useState([{}]);
    const [isEventsLoading, setIsEventsLoading] = useState(true);
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
            setEmployee(employee.data);
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

    const calculateLeavePercentage = (used, total) => {
        const percentage = (used / total) * 100;
        return percentage;
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    // Fetch upcoming events
    const fetchUpcomingEvents = async () => {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/bookings/getAllBookings`
        );
        const temp = response.data.filter((event) => {
            return event.eventDate > formattedToday;
        });
        setUpcomingEvents(temp);
        console.log(temp);
        setIsEventsLoading(false);
    };

    useEffect(() => {
        fetchUpcomingEvents();
    }, []);

    return (
        <div className="employee_dashboard_hero">
            <div className="emp_dashboard_main_container">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "space-between",
                        marginBottom: "20px",
                    }}
                >
                    <h1>Upcoming Events</h1>
                </div>
                {isEventsLoading ? (
                    <div className="center" style={{ marginTop: "140px" }}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.slice(0, 8).map((item) => {
                                const eventDate = new Date(item.eventDate);
                                // Get the date (day of the month) and day (day of the week)
                                const date = eventDate.getDate();
                                const day = eventDate.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "short",
                                    }
                                );
                                return (
                                    <div className="emp_dashboard_events_container_item">
                                        <div className="emp_dashboard_events_container_item_left center">
                                            <h4>{date}</h4>
                                            <h5>{day}</h5>
                                        </div>
                                        <div className="emp_dashboard_events_container_item_right">
                                            <h4>{item.eventType}</h4>
                                            <h5>{item.packageType}</h5>
                                        </div>
                                        {item.eventLocation &&
                                            item.eventLocation[0] && (
                                                <h2>
                                                    {
                                                        item.eventLocation[0]
                                                            .district
                                                    }
                                                </h2>
                                            )}
                                        <h3>{formatDate(item.eventDate)}</h3>
                                    </div>
                                );
                            })
                        ) : (
                            <div
                                className="center"
                                style={{ marginTop: "80px" }}
                            >
                                <h6 style={{ color: "#8d93a5" }}>
                                    No Upcoming Events
                                </h6>
                            </div>
                        )}
                    </>
                )}
            </div>
            {employee ? (
                <div>
                    <div className="emp_dashboard_pending_laves_container">
                        <div>
                            <h1>Pending Leave Requests</h1>
                            {pendingLeaves.length > 0 ? (
                                pendingLeaves.slice(0, 4).map((item) => (
                                    <div className="emp_dashboard_pending_lave_rows">
                                        <h5>
                                            {formatDatefunc(item.createdAt)}
                                        </h5>
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
                            percent={calculateLeavePercentage(
                                employee.leavesBalance[2].casualUsed,
                                employee.leavesBalance[2].casualLeave
                            )}
                            format={(percent) => (
                                <span>
                                    {employee.leavesBalance[2].casualUsed}/
                                    {employee.leavesBalance[2].casualLeave}
                                </span>
                            )}
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
                                <h5>
                                    Remaining -{" "}
                                    {employee.leavesBalance[2].casualLeave -
                                        employee.leavesBalance[2].casualUsed}
                                </h5>
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
                                <h5>
                                    Used -{" "}
                                    {employee.leavesBalance[2].casualUsed}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="emp_dashboard_leave_balance_container">
                        <Progress
                            type="circle"
                            strokeWidth={10}
                            strokeColor={"#4F46E5"}
                            strokeLinecap="square"
                            percent={calculateLeavePercentage(
                                employee.leavesBalance[1].sickUsed,
                                employee.leavesBalance[1].sickLeave
                            )}
                            format={(percent) => (
                                <span>
                                    {employee.leavesBalance[1].sickUsed}/
                                    {employee.leavesBalance[1].sickLeave}
                                </span>
                            )}
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
                                <h5>
                                    Remaining -{" "}
                                    {employee.leavesBalance[1].sickLeave -
                                        employee.leavesBalance[1].sickUsed}
                                </h5>
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
                                <h5>
                                    Used - {employee.leavesBalance[1].sickUsed}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="emp_dashboard_leave_balance_container">
                        <Progress
                            type="circle"
                            strokeWidth={10}
                            strokeColor={"#4F46E5"}
                            strokeLinecap="square"
                            percent={calculateLeavePercentage(
                                employee.leavesBalance[0].halfUsed,
                                employee.leavesBalance[0].halfLeave
                            )}
                            format={(percent) => (
                                <span>
                                    {employee.leavesBalance[0].halfUsed}/
                                    {employee.leavesBalance[0].halfLeave}
                                </span>
                            )}
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
                                <h5>
                                    Remaining -{" "}
                                    {employee.leavesBalance[0].halfLeave -
                                        employee.leavesBalance[0].halfUsed}
                                </h5>
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
                                <h5>
                                    Used - {employee.leavesBalance[0].halfUsed}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default EmpDashboard;
