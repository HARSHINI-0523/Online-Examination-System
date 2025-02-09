import { userLoginContext } from "./userLoginContext";
import {useState} from 'react';
import API from "../api/axios"

function UserLoginStore({ children }){

    let [currentUser,setCurrentUser]= useState(null);
    let [userLoginStatus,setUserLoginStatus]=useState(false);
    let [err,setError]=useState("");

    //User login
    async function LoginUser(userCred){
        try{
            let res=await API.post("/user/login",userCred,{ withCredentials: true });
            if(res.status===200){
                checkSession(); // Verify session after login
                setError("");
            }
            else{
                setError(res.message);
                setCurrentUser('null');
                setUserLoginStatus(false);
            }
        }
        catch(error){
            setError(error.message);
        }
    }

    // Check session
    async function checkSession() {
        try {
        let res = await API.get("/user/check-session", { withCredentials: true });
        setCurrentUser(res.data.userId);
        setUserLoginStatus(true);
        console.log(res.data);
        } catch (error) {
        setCurrentUser(null);
        setUserLoginStatus(false);
        }
    }

    async function LogoutUser(){
        await API.post('/user/logout', {}, { withCredentials: true });
        alert('Logged out');
        setCurrentUser({});
        setUserLoginStatus(false);
        setError('')
    }

    return (
        <userLoginContext.Provider value={{ currentUser, userLoginStatus, LoginUser, LogoutUser ,setCurrentUser, err }}>
          {children}
        </userLoginContext.Provider>
      );
}

export default UserLoginStore;