import "./Header.css"
import { Link } from "react-router-dom";
function Header(){
    return(
        <div>
            <div className="home-header flex">
                <div className="website-name"><a href="/" style={{ color: "black" }}>OES</a></div>
                
                <div className="header-option">
                    Features 
                </div>
                
                <div className="header-option">
                    <Link to="/AboutUs">About us</Link>
                </div>
                
                <div className="header-option">
                        Feedback
                </div>

                <div className="header-option">
                    <Link to="/login">Login</Link>
                </div>

                <div className="header-option">
                    <button className="btn btn-primary ">Take Demo Test</button>
                </div>

            </div>
        </div>
    )

}

export default Header;