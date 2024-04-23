
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
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import { Reset, Verify } from "./pages/user";
import { useEffect,useState } from "react";
import axios from "axios";

function App() {

    const [user, setUser] = useState(null);
    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const {data} = await axios.get(url, { withCredentials: true });
            setUser(data.user._json);

        }
        catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getUser();
    }
    , []);



    return (
        <div className="App">
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<HomePage  />} />
                    <Route path="/userprofile/*" element={<UserProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/packages/:category" element={<Packages />} />
                    <Route path="/booking/:category/:id" element={<Booking />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/employee/*" element={<EmpDashboard />} />
                    <Route
                        path="/forgetpassword"
                        element={<ForgetPassword />}
                    />
                    <Route path="/reset-password/:id/:token" element={<Reset />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/accessdenied" element={<AccessDenied />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
