import {  Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Browseskills from './pages/Browseskills';
import Requests from './pages/Requests';
import UserProfile from './pages/UserProfile';
import SetupProfile from './pages/SetupProfile';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AdminPage from './pages/AdminPage';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/browse-skills" element={<Browseskills/>} />
          <Route path="/requests" element={<Requests/>} />
          <Route path="/profile/:userId" element={<UserProfile/>} />
          <Route path="/chat/:requestId" element={<Chat/>} />
          <Route path="/setup-profile" element={<SetupProfile/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin/*" element={<AdminPage />} />
          

        </Routes>
    
  );
}

export default App;
