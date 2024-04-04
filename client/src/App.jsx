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
} from "./pages";
import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import { Reset, Verify } from "./pages/user";
import axios from "axios";
import { useEffect,useState } from "react";




function App() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = localStorage.getItem("currentUser");
            if (currentUser) {
                try {
                    const response = await axios.get(`/api/users/${JSON.parse(currentUser).userID}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("User fetch error:", error);
                }
            }
        };
        fetchUser();
    }, []);


    return (
        <div className="App">
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<HomePage  />} />
                    <Route path="/userprofile/*" element={<UserProfile />} />
                    <Route path="/login" element={user ? <HomePage user ={user}/>:<Login />} />
                    <Route path="/signup" element={user ? <HomePage user ={user}/>:<SignUp />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/employee/*" element={<EmpDashboard />} />
                    <Route path="/forgetpassword" element={<ForgetPassword/>} />
                    <Route path ="/reset" element={<Reset/>} />
                    <Route path="/verify" element={<Verify/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
