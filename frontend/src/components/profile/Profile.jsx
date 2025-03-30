import { useContext, useState, useEffect } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Profile.css";
import API from "../../api/axios";
import ClassRooms from "../classrooms/ClassRooms";

function Profile() {
  const { currentUser } = useContext(userLoginContext);
  const [classrooms, setClassrooms] = useState([]);
  useEffect(() => {
    async function loadClassrooms() {
      try {
        const res = await API.get("/profile/classrooms");
        setClassrooms(res.data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    }
    loadClassrooms();
  }, []);

  if (!currentUser) return <p>Loading...</p>;

  const isTeacher = currentUser.role === "teacher";
  const isStudent = currentUser.role === "student";

  // Dummy recent test data for students
  const recentTests = currentUser.recentTests || [];

  // Categorizing test scores
  const categories = { "<40%": 0, "40-70%": 0, ">70%": 0 };
  recentTests.forEach((test) => {
    if (test.score < 40) categories["<40%"]++;
    else if (test.score < 70) categories["40-70%"]++;
    else categories[">70%"]++;
  });

  // Pie chart data
  const pieData = [
    { name: "<40%", value: categories["<40%"], color: "#ff4d4d" },
    { name: "40-70%", value: categories["40-70%"], color: "#ffc107" },
    { name: ">70%", value: categories[">70%"], color: "#28a745" },
  ];



  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Info */}
        <div className="profile-info">
          <h1>Profile</h1>
          <p>
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Role:</strong> {currentUser.role}
          </p>
          <p><strong>Workplace:</strong> {currentUser.workPlace}</p>
          
        </div>

        {/* Profile Image */}
        <div className="profile-image">
        <img src={currentUser.photo} alt={`${currentUser.username}'s profile`} />
        </div>
      </div>

      <ClassRooms />
      {/* Student Dashboard */}
      {isStudent && (
        <>
          

          <div className="profile-chart">
            <h2>Test Performance</h2>
            {recentTests.length > 0 ? (
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p>No test data available for performance chart.</p>
            )}
          </div>
        </>
      )}

      
        
    </div>
  );
}

export default Profile;
