import "./Verification.css";
import { useEffect, useState, useContext } from "react";
import API from "../../api/axios";
import { userLoginContext } from "../../contexts/userLoginContext";

function Verification() {
  const { currentUser } = useContext(userLoginContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get(
          `/teacher/get-Pending-Teachers?workPlace=${encodeURIComponent(currentUser.workPlace)}`,
          { withCredentials: true }
        );
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching verification requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (teacherId) => {
    try {

        console.log("Teacher Id: ",teacherId)
      await API.post("/teacher/approve-Teacher", { teacherId }, { withCredentials: true });

      // Remove the approved teacher from the UI
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== teacherId));

      alert("Teacher approved successfully!");
    } catch (error) {
      console.error("Error approving teacher:", error);
      alert("Failed to approve teacher.");
    }
  };

  const handleReject = async (teacherId) => {
    try {

        console.log("Teacher Id: ",teacherId)
      await API.post("/teacher/reject-Teacher", { teacherId }, { withCredentials: true });

      // Remove the rejected teacher from the UI
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== teacherId));

      alert("Teacher rejected successfully!");
    } catch (error) {
      console.error("Error rejecting teacher:", error);
      alert("Failed to reject teacher.");
    }
  };

  return (
    <div className="verification-container">
      <h1>Verify Requests</h1>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="request-card">
            <div className="request-info">
              <h5>Username: {request.username}</h5>
            </div>
            <div className="request-btns">
              <button className="request-a-btn" onClick={() => handleApprove(request._id)}>Approve</button>
              <button className="request-r-btn" onClick={() => handleReject(request._id)}>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending verification requests.</p>
      )}
    </div>
  );
}

export default Verification;
