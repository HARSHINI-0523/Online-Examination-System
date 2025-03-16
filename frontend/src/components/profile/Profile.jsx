import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Profile.css";

function Profile() {
  const { currentUser } = useContext(userLoginContext);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  // Dummy recent test data
  const recentTests = currentUser.recentTests || [];

  // Categorizing test scores
  const categories = { "<40%": 0, "40-70%": 0, ">70%": 0 };
  recentTests.forEach(test => {
    if (test.score < 40) categories["<40%"]++;
    else if (test.score < 70) categories["40-70%"]++;
    else categories[">70%"]++;
  });

  // Pie chart data
  const pieData = [
    { name: "<40%", value: categories["<40%"], color: "#ff4d4d" },
    { name: "40-70%", value: categories["40-70%"], color: "#ffc107" },
    { name: ">70%", value: categories[">70%"], color: "#28a745" }
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Info */}
        <div className="profile-info">
          <h1>Profile</h1>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Role:</strong> {currentUser.role}</p>
          <p><strong>Workplace:</strong> {currentUser.workPlace}</p>
          <p><strong>Purpose:</strong> {currentUser.purpose}</p>
          <p><strong>Phone:</strong> {currentUser.phone}</p>
          <p><strong>Address:</strong> {currentUser.address}</p>
        </div>

        {/* Profile Image */}
        <div className="profile-image">
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_kerHqsbqO2MKCk-B9DBaaFt_QC4R7kBDAI5p-_oY77injCiGG8mJzpON0pDjJ6c0qk&usqp=CAU"}
            alt="Profile"
          />
        </div>
      </div>

      {/* Test Performance Section */}
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

      {/* Recent 10 Test Attempts */}
      <div className="test-attempts">
        <h2>Recent 10 Test Attempts</h2>
        {recentTests.length > 0 ? (
          <ul>
            {recentTests.map((test, index) => (
              <li key={index}><strong>{test.name}:</strong> {test.score}%</li>
            ))}
          </ul>
        ) : (
          <p>No test data available.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
