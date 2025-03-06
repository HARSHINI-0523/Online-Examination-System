import './Dashboard.css'
import {Link} from "react-router-dom";

function Dashboard() {
    return(
        <div>
            <sidebar>
            <div className="dashboard-contents">
                <Link to="/">Exams</Link>
                <Link to="/">Notifications</Link>
                <Link to="/">Detailed Analysis</Link> 
                <Link to="/">Update Profile</Link>
                <Link to="/">Change Password</Link>
                <Link to="/">Logout</Link>

            </div>
            </sidebar>
        </div>
    )
}

export default Dashboard;