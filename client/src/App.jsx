import "./App.css";
import {
    HomePage,
    AdminDashboard,
    Article,
    UserProfile,
    Login,
    SignUp,
    ContactUs,
    Packages,
    Booking,
    Blog,
    EmpDashboard,
    ForgetPassword,
    AccessDenied,
    PageNotFound,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reset, Verify } from "./pages/user";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/">
                <GoogleOAuthProvider clientId="550101808419-h6glh8sc3bpfnkaq38963jjruntadf51.apps.googleusercontent.com">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
    
                </GoogleOAuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/userprofile/*" element={<UserProfile />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/packages/:category" element={<Packages />} />
                    <Route
                        path="/booking/:category/:id"
                        element={<Booking />}
                    />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/employee/*" element={<EmpDashboard />} />
                    <Route
                        path="/forgetpassword"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="/reset-password/:id/:token"
                        element={<Reset />}
                    />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/accessdenied" element={<AccessDenied />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
