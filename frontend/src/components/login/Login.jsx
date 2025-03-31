import "./Login.css";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { useState,useContext, useEffect } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import LoginAnimation from "../../assets/Animations/LoginAnimation.json";
import { userLoginContext } from "../../contexts/userLoginContext";
function Login() {
  let navigate = useNavigate();
  const { LoginUser, err , userLoginStatus} = useContext(userLoginContext);
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });


  const [signUpError, setSignUpError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resetPasswordMsg, setResetPasswordMsg] = useState("");

  //Animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (userLoginStatus) {
        navigate("/dashboard/profile");
        localStorage.setItem("isNewUser", "false");
    }
}, [userLoginStatus]); // Runs when `userLoginStatus` changes

  //Active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setForgotPasswordMode(false);
  };

  //Handle change in formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPasswordChange = (e) => {
    setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
  };

  //Handle Signup submit button
  async function handleSubmitSignup(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      //API call to signup
      try {
        let response = await API.post("/user/signup", formData);
        console.log(formData);
        LoginUser(formData);
        localStorage.setItem("isNewUser", "true"); // Set new user flag
        navigate("/dashboard/updateProfile");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            setSignUpError(error.response.data.message);
          } else {
            setSignUpError("Something went wrong. Please try again later.");
          }
        } else {
          setSignUpError("Something went wrong. Please try again later.");
        }
      }
    }
  }

  // Handle Login submit button
  async function handleSubmitLogin(e) {
    e.preventDefault();
    try {
      const response = await API.get("/teacher/is-unverified", {
        params: { username: formData.username }, 
        withCredentials: true,
      });
      
      if (response.data.isUnverified) { 
        navigate("/dashboard/verification-process");
        return; // Stop further execution if unverified
      }
  
      const loginResponse = await LoginUser(formData); // Await the login process

        // Fetch the updated login status from localStorage or directly check if login was successful
        const updatedLoginStatus = JSON.parse(localStorage.getItem("userLoginStatus"));
        if (updatedLoginStatus) { 
        localStorage.setItem("isNewUser", "false"); 
        navigate("/dashboard/profile");
      }
      else{
        alert("Not a valid user.Need to Signup first..")
      }
     
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid username or password"); 
    }
  }
  
  return (
    <div className="sl-container">
      <div>
        <Lottie options={defaultOptions} height={600} width={700} />
      </div>
      <div className="sl-form-container">
        <div className="sl-tabs">
          <button
            className={`signup-login-tab-btn ${activeTab === "signup" ? "active-slp" : ""}`}
            onClick={() => handleTabClick("signup")}
          >
            Signup
          </button>
          <button
            className={`signup-login-tab-btn ${activeTab === "login" ? "active-slp" : ""}`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </button>
        </div>
        <div className="sl-body">
          {activeTab == "signup" && (
            <div className="signup-container">
              {signUpError && (
                        <p className="text-danger">
                            {signUpError}
                        </p>
                    )}
              <form onSubmit={handleSubmitSignup}>
                <div className="form-item">
                  <label htmlFor="email">
                    Email Address <span className="form-req">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="username">
                    Username <span className="form-req">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    minLength={7}
                    maxLength={10}
                    required
                  />
                  <p className="text-secondary">
                    Atleast 7 characters and atmost 10 characters required.
                  </p>
                </div>
                <div className="form-item">
                  <label htmlFor="password">
                    Password <span className="form-req">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="passwd"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={4}
                    maxLength={10}
                    required
                  />
                  <p className="text-secondary">
                    Atleast 4 characters and atmost 10 characters required.
                  </p>
                </div>
                <div className="form-item">
                  <label htmlFor="confirmPassword">
                    Confirm Password <span className="form-req">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPass"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Sign Up
                </button>
              </form>
            </div>
          )}
          {activeTab == "login" && (
            <div className="login-container">
              {loginError && <p className="text-danger">{loginError}</p>}
              <form onSubmit={handleSubmitLogin}>
                <div className="form-item">
                  <label htmlFor="username">
                    Username <span className="form-req">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="password">
                    Password <span className="form-req">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
