import './App.css';
import { AdminDashboard, UserProfile, Login, SignUp} from './pages'
import{BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/user" element={<UserProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
