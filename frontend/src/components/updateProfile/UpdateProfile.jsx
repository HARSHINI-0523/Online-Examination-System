import "./UpdateProfile.css";
import { useState, useContext, useEffect } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import Lottie from "react-lottie";
import UpAnimation from "../../assets/Animations/UpAnimation.json";
import API from "../../api/axios"; // Import axios for API calls

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(userLoginContext);

  // Ensure currentUser is not null before setting formData
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    role: currentUser?.role || "student",
    workPlace: currentUser?.workPlace || "",
    purpose: currentUser?.purpose || "conduct-tests",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });

  const [profileImage, setProfileImage] = useState(
    currentUser?.photo ||
      "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
  );

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        role: currentUser.role || "student",
        workPlace: currentUser.workPlace || "",
        purpose: currentUser.purpose || "conduct-tests",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      });
      setProfileImage(currentUser.photo || "default-image-url");
    }
  }, [currentUser]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: UpAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      // You can add any custom logic here if user isn't logged in
      alert("User not logged in.");
      return;
    }

    try {
      const response = await API.put("/user/update", 
        {
          username: currentUser.username, // Pass user ID for update
          ...formData, // Pass updated user data
          photo: profileImage, // Update profile picture
        },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        updateUser(response.data.user); // Update context with new data
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="update-profile">
      <h1>Update Profile</h1>
      <div className="up-body">
        <div className="left-section">
          <div className="profile-photo">
            <img src={profileImage} alt="Profile" />
          </div>
          <button onClick={handleUploadClick} className="upload-btn">
            Upload
          </button>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="right-section">
          <form onSubmit={handleSubmit}>
            <div className="up-form-item">
              <label>Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="up-form-item">
              <label>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="up-form-item">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="up-form-item">
              <label>Workplace:</label>
              <input
                type="text"
                id="work-place"
                name="workPlace"
                value={formData.workPlace}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="up-form-item">
              <label htmlFor="purpose">Purpose:</label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
              >
                <option value="conduct-tests">Conduct Tests</option>
                <option value="take-tests">Take tests</option>
                <option value="group">
                  Form a group to study and improve together
                </option>
              </select>
            </div>
            <div className="up-form-item">
              <label>Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="up-form-item">
              <label>Address:</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="update-btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
