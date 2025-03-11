import "./Dashboard.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import Profile from "../profile/Profile";
import UpdateProfile from "../updateProfile/UpdateProfile";

function Dashboard() {
  const navigate = useNavigate();
  const { LogoutUser } = useContext(userLoginContext);

  // Check if user is new
  const isNewUser = localStorage.getItem("isNewUser") === "true";

  // Default to "updateProfile" for new users, otherwise keep last active section
  const getStoredSection = () => {
    return localStorage.getItem("isNewUser") === "true" ? "updateProfile" : "profile";
  };
  
  const [activeSection, setActiveSection] = useState(getStoredSection);

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
    navigate(`/dashboard/${activeSection}`);
  }, [activeSection]);

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = async () => {
    await LogoutUser();
    localStorage.removeItem("activeSection");
    localStorage.removeItem("isNewUser"); // Clear new user flag on logout
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <Link to="/">Exams</Link>
        <Link to="/">Notifications</Link>
        <Link to="/">Detailed Analysis</Link>
        <button onClick={() => handleSidebarClick("profile")}>Profile</button>
        <button onClick={() => handleSidebarClick("updateProfile")}>Update Profile</button>
        <Link to="/">Change Password</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-main-content">
        {activeSection === "profile" && <Profile />}
        {activeSection === "updateProfile" && <UpdateProfile />}
      </div>
    </div>
  );
}

export default Dashboard;
