import "./Login.css";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import LoginAnimation from "../../assets/Animations/LoginAnimation.json";
import { userLoginContext } from "../../contexts/userLoginContext";
function Login() {
  let navigate = useNavigate();
  const { LoginUser, err } = useContext(userLoginContext);
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpError, setSignUpError] = useState("");
  const [loginError, setLoginError] = useState("");

  //Animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //Active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //Handle change in formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        navigate("/dashboard/update-profile");
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

  //Handle Login submit button
  async function handleSubmitLogin(e) {
    e.preventDefault();
    await LoginUser(formData);
    if (!err) navigate("/dashboard");
  }

  return (
    <div className="sl-container">
      <div>
        <Lottie options={defaultOptions} height={600} width={700} />
      </div>
      <div className="sl-form-container">
        <div className="sl-tabs">
          <button
            className={`sl-tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => handleTabClick("signup")}
          >
            Signup
          </button>
          <button
            className={`sl-tab-btn ${activeTab === "login" ? "active" : ""}`}
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
