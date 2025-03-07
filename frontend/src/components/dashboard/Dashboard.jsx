import './Dashboard.css'
import {Link} from "react-router-dom";

function Dashboard() {
    return(
        <div>
            
            <div className="dashboard-contents">
                <Link to="/">Exams</Link>
                <Link to="/">Notifications</Link>
                <Link to="/">Detailed Analysis</Link> 
                <Link to="/">Update Profile</Link>
                <Link to="/">Change Password</Link>
                <Link to="/">Logout</Link>

            </div>
           
        </div>
    )
}

export default Dashboard;