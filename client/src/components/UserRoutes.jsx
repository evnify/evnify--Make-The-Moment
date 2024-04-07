import React from "react";
import {Routes, Route} from "react-router-dom";
import Profile from "./users/UserProfile"
import {Booking,UserSettings,ContactUS} from "./users";


function UserRoutes() {
    return <div>
        <Routes>
            <Route path="/" element={<Profile/>} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/UserSettings" element={<UserSettings/>} />
            <Route path="/contactus" element={<ContactUS/>} />   
        </Routes>
    </div>;
}

export default UserRoutes;
