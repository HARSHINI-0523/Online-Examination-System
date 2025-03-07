import "./Header.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {userLoginContext} from "../../contexts/userLoginContext";
import { useContext } from "react";

function Header(){

    const { userLoginStatus , err } = useContext(userLoginContext);

    return(
        <div>
            <div className="home-header flex">
                <div className="website-name"><a href="/" style={{ color: "black" }}>OES</a></div>
                
                <div className="header-option">
                <Link to="/features">Features</Link>  
                </div>
                
                <div className="header-option">
                   <Link to="/AboutUs">About us </Link> 
                </div>
                
                <div className="header-option">
                      <Link to="/feedback">Feedback</Link>  
                </div>

                <div className="header-option">
                    {userLoginStatus?(<Link to="/user-profile">Profile</Link>):(<Link to="/login">Login</Link>)}
                    
                </div>

                <div className="header-option">
                    <button className="btn btn-primary ">Take Demo Test</button>
                </div>

            </div>
        </div>
    )

}

export default Header;