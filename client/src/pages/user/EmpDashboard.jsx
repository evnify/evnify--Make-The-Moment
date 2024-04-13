import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmpRoutes, EmpSideMenu, EmpHero } from "../../components";
import { Loader } from "../../components/admin";

function EmpDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
            navigate("/login");
        } else if (user.userType !== "Employee") {
            navigate("/accessdenied");
        } else {
            setLoading(false);
        }
    }, []);
    return (
        <>
            {loading ? (
                <div className="center" style={{ height: "100vh" }}>
                    <Loader />
                </div>
            ) : (
                <div className="Emp_DashboardContainer">
                    <div className="Emp_SideMenuAndPage_Content">
                        <div style={{ position: "absolute" }}>
                            <EmpSideMenu />
                        </div>
                        <div className="Emp_Page_Content">
                            <EmpHero />
                            <EmpRoutes />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EmpDashboard;
