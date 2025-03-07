import { useContext } from "react"; 
import { userLoginContext } from "../../contexts/userLoginContext";

function Profile(){
    const {currentUser} = useContext(userLoginContext);
    console.log("Current user",currentUser);
    return(
        
        <h1>Profile</h1>
        
    )
}

export default Profile;