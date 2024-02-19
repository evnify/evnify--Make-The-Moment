import "./App.css";
import {
    HomePage,
    AdminDashboard,
    UserProfile,
    Login,
    SignUp,
    ContactUs,
    Packages,
    Booking,
    Blog,
    EmpDashboard
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/employee/*" element={<EmpDashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
