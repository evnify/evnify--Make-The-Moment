import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    MainDashboard,
    UsersInsights,
    AdminUsers,
    Packages,
    Bookings,
    InventoryInsights,
    InventoryList,
    EmployeeList,
    LeaveRequests,
    AddBlog,
    ExistingBlogs,
    PaymentInsights,
    Payroll,
    MessageInsights,
    AllMessages
} from "./admin";

function AdminRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainDashboard />} />
                <Route path="/userinsights" element={<UsersInsights />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/inventoryinsights" element={<InventoryInsights />} />
                <Route path="/inventorylist" element={<InventoryList />} />
                <Route path="/employeelist" element={<EmployeeList />} />
                <Route path="/leaverequests" element={<LeaveRequests />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/blogs" element={<ExistingBlogs />} />
                <Route path="/paymentinsights" element={<PaymentInsights />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/messageinsights" element={<MessageInsights />} />
                <Route path="/allmessages" element={<AllMessages />} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;
