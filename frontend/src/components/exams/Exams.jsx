import "./Exams.css";
import { useContext, useState, useEffect } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import API from "../../api/axios";
function Exams() {
  const { currentUser } = useContext(userLoginContext);
  const [exams, setExams] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await API.get("/exams/teacher-get-exams", {
          withCredentials: true,
        })
        setExams(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="exams">
      {currentUser.role === "student" ? (
        <h1>Student Exams</h1>
      ) : currentUser.role === "teacher" ? (
        <div>
          <h1>Exams</h1>
          <div className="create-exam-btn">
            <p className="create-exam-msg">
              Click the button to conduct a new exam
            </p>
            <button>Create Exam</button>
          </div>

          <div>
            <h2>Exams Conducted</h2>
            <div className="exams-container">
              {exams.length > 0 ? (
                exams.map((exam, index) => (
                  <div key={index} className="exam-card">
                    <h3>{exam.name}</h3>
                    <p>Exam Date: {exam.date}</p>
                    <p>Exam Time: {exam.time}</p>
                    <p>Exam Duration: {exam.duration}</p>
                    <p>Total Questions: {exam.totalQuestions}</p>
                    <p>Total Marks: {exam.totalMarks}</p>
                  </div>
                ))
              ) : (
                <p>No exams conducted yet</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Unauthorized</h1>
      )}
    </div>
  );
}

export default Exams;
