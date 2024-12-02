import React, { useState } from 'react';
import './adminHome.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../../redux/adminSlice';
import Alert from '../../alert/alert';

function AdminHome(){
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowAlert(true); 
      };
      const handleConfirmLogout = () => {
        dispatch(logoutAdmin());
        navigate("/admin");
        setShowAlert(false); 
      };  
      const handleCancelLogout = () => {
        setShowAlert(false); 
      };
      const goToDashboard = () => {
        navigate("/dashboard");
      };  

    const user = useSelector((state) => state.admin.admin);

    console.log(user.profileImage)
    return (
        <div className="admin-home-container">
          {showAlert && (
            <Alert
              message="Are you sure you want to log out?"
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
            />
          )}
          <div className="admin-home-left">
            <h1>Welcome Home</h1>
            <p>Welcome to your Home page. Manage your tasks and view statistics here.</p>
            <img
                   src={`http://localhost:3000${user.profileImage}`}
                   alt="Admin Profile"
                   className="profile-image"
            />
            
          </div>
    
          <div className="admin-home-right">
            <div className="admin-info">
              <h2>Admin Info</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Designation:</strong> Admin</p>
              <div className="admin-home-buttons">
                <button onClick={goToDashboard} className="dashboard-btn">Dashboard</button>
                <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default AdminHome;