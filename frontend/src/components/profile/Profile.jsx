import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import "./Profile.css";

function Profile() {
  const { currentUser } = useContext(userLoginContext);

  console.log(currentUser)
  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>Profile</h1>
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Role:</strong> {currentUser.role}</p>
        <p><strong>Workplace:</strong> {currentUser.workPlace}</p>
        <p><strong>Purpose:</strong> {currentUser.purpose}</p>
        <p><strong>Phone:</strong> {currentUser.phone}</p>
        <p><strong>Address:</strong> {currentUser.address}</p>
      </div>

      <div className="profile-image">
        <img src={currentUser.photo || "default-profile.png"} alt="Profile" />
      </div>
    </div>
  );
}

export default Profile;
