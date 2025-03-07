import { userLoginContext } from "./userLoginContext";
import {useState} from 'react';
import API from "../api/axios"

function UserLoginStore({ children }){

    let [currentUser,setCurrentUser]= useState(null);
    let [userLoginStatus,setUserLoginStatus]=useState(false);
    let [err,setError]=useState("");

    //update user details
    async function updateUser(userCred) {
       setCurrentUser(userCred);
    }
    //User login
    async function LoginUser(userCred){
        try{
            let res=await API.post("/user/login",userCred,{ withCredentials: true });
            if(res.status===200){
                setCurrentUser(res.data.user);
                setUserLoginStatus(true);
                checkSession(); // Verify session after login
                setError("");
                return res.data;
            }
            else{
                setError(res.message);
                setCurrentUser('null');
                setUserLoginStatus(false);
                return null;
            }
        }
        catch(error){
            setError(error.message);
            return null;
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
        <userLoginContext.Provider value={{ currentUser, userLoginStatus, updateUser, LoginUser, LogoutUser ,setCurrentUser, err }}>
          {children}
        </userLoginContext.Provider>
      );
}

export default UserLoginStore;