import React from "react";
import {Routes, Route} from "react-router-dom";
import {EmpDashboard, EmpEvents, EmpLeaves, EmpSalary} from "./employee";

function EmpRoutes() {
    return <div>
        <Routes>
            <Route path="/" element={<EmpDashboard />} />
            <Route path="/leaves" element={<EmpLeaves />} />
            <Route path="/salary" element={<EmpSalary />} />
            <Route path="/events" element={<EmpEvents />} />
        </Routes>
    </div>;
}

export default EmpRoutes;
