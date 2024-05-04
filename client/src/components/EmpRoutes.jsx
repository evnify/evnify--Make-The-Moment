import React from "react";
import {Routes, Route} from "react-router-dom";
import {EmpDashboard, EmpLeaves, EmpSalary} from "./employee";

function EmpRoutes() {
    return <div>
        <Routes>
            <Route path="/" element={<EmpDashboard />} />
            <Route path="/leaves" element={<EmpLeaves />} />
            <Route path="/salary" element={<EmpSalary />} />
        </Routes>
    </div>;
}

export default EmpRoutes;
