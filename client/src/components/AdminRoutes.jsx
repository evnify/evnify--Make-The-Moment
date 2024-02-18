import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    MainDashboard,
    UsersInsights,
    AdminUsers,
    PackageInsights,
    PackageList,
    NewPackage,
    Bookings,
    InventoryInsights,
    InventoryList,
    NewInventory,
    EmployeeList,
    AddEmployee,
    LeaveRequests,
    AssignEvents,
    AddBlog,
    ExistingBlogs,
    PaymentInsights,
    Payroll,
    AssignSalary,
    MessageInsights,
    AllMessages,
    UserEmails
} from "./admin";

function AdminRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainDashboard />} />
                <Route path="/userinsights" element={<UsersInsights />} />
                <Route path="/users" element={<AdminUsers />} />
                <Route path="/packageinsights" element={<PackageInsights />} />
                <Route path="/packagelist" element={<PackageList />} />
                <Route path="/addpackages" element={<NewPackage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/inventoryinsights" element={<InventoryInsights />} />
                <Route path="/inventorylist" element={<InventoryList />} />
                <Route path="/newinventory" element={<NewInventory />} />
                <Route path="/employeelist" element={<EmployeeList />} />
                <Route path="/addemployee" element={<AddEmployee />} />
                <Route path="/leaverequests" element={<LeaveRequests />} />
                <Route path="/assigntoevents" element={<AssignEvents />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/blogs" element={<ExistingBlogs />} />
                <Route path="/paymentinsights" element={<PaymentInsights />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/assignsalary" element={<AssignSalary />} />
                <Route path="/messageinsights" element={<MessageInsights />} />
                <Route path="/allmessages" element={<AllMessages />} />
                <Route path="/useremails" element={<UserEmails />} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;
