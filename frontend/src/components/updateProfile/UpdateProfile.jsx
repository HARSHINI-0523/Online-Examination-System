import "./UpdateProfile.css";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import Lottie from "react-lottie";
import UpAnimation from "../../assets/Animations/UpAnimation.json";

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(userLoginContext);
  const defaultOptions={
    loop: true,
    autoplay:true,
    animationData: UpAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      },
  }

  return (
    <div className="update-profile">
      <h1>Update Profile</h1>
      <div className="up-body">
        <div className="up-card">
          <p className="typing-text">
            Take a moment to refine your profile,
            <br />
            A touch of detail, a hint of style.
            <br />
            Let your presence shine with grace,
            <br />
            Complete your journey—set the pace.
          </p>
          <Lottie options={defaultOptions} height={400} />
        </div>
        <div className="profile-photo"></div>
        <form>
          <div className="up-form-item">
            <label>Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="up-form-item">
            <label>Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="up-form-item">
            <label htmlFor="role">What is your role?</label>
            <select id="role" name="role">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="up-form-item">
            <label htmlFor="work-place">Where do you work/study ?</label>
            <input type="text" id="work-place" name="work-place" required />
          </div>
          <div className="up-form-item">
            <label htmlFor="purpose">What is your purpose to use OES?</label>
            <select id="purpose" name="purpose">
              <option value="conduct-tests">Conduct Tests</option>
              <option value="take-tests">Take tests</option>
              <option value="group">
                Form a group to study and improve together
              </option>
            </select>
          </div>
          <div className="up-form-item">
            <label>Phone Number:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="up-form-item">
            <label>Address:</label>
            <textarea id="address" name="address" required />
          </div>
          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
