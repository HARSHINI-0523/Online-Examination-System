import "./Exams.css";
import { useContext, useState, useEffect } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import API from "../../api/axios";
import jsPDF from "jspdf";
import { TiThMenu } from "react-icons/ti";
import CreateExam from "../createExam/CreateExam"; // ✅ Importing CreateExam component

function Exams() {
  const { currentUser } = useContext(userLoginContext);
  const [exams, setExams] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [examLink, setExamLink] = useState("");
  const [showCreateExam, setShowCreateExam] = useState(false); // ✅ Track create exam modal

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = (examId) => {
    setOpenMenuId(openMenuId === examId ? null : examId);
  };

  const handleOpenGroupModal = async () => {
    if (!currentUser || !currentUser.id) {
      console.error("User is not logged in or user ID is missing.");
      return;
    }

    setIsModalOpen(true);
    try {
      const response = await API.get(`/groups/user/${currentUser.id}`);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  // ✅ Fetch exams from backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await API.get("/exams/teacher-get-exams", {
          withCredentials: true,
        });
        console.log("Exams created: ", res.data);
        setExams(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
  }, []);

  const openInstructionsModal = (link) => {
    setExamLink(link);
    setShowInstructions(true);
  };

  const handleTakeExam = () => {
    if (agreed) {
      window.open(examLink, "_blank");
      setShowInstructions(false);
    }
  };

  const generatePDF = (questions, title) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 10, 10);

    questions.forEach((q, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${q.question}`, 10, 20 + index * 10);

      if (q.options) {
        q.options.forEach((opt, i) => {
          doc.text(`  ${String.fromCharCode(65 + i)}. ${opt}`, 15, 30 + index * 10 + i * 5);
        });
      }
    });

    doc.save(`${title}.pdf`);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(false);
  };

  const handlePostToGroup = async () => {
    if (!selectedGroup) {
      alert("Please select a group first!");
      return;
    }

    const postData = {
      content: "Your post content here...",
      groupId: selectedGroup._id,
      userId: currentUser?.id,
    };

    try {
      const res = await API.post("/posts/group", { withCredentials: true });
      console.log("Post submitted: ", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Handle newly created exam and update list
  const handleExamCreated = (newExam) => {
    setExams([...exams, newExam]); // Append new exam to list
    setShowCreateExam(false); // Hide create exam form
  };

  return (
    <div className="exams-container">
      <h1 className="exam-heading">Exams</h1>

      {/* ✅ Show Create Exam form if clicked */}
      {showCreateExam ? (
        <CreateExam onExamCreated={handleExamCreated} />
      ) : (
        <>
          <div className="exam-intro">
            <p>Click the button to conduct a new exam</p>
            <button className="create-exam-btn" onClick={() => setShowCreateExam(true)}>
              Create Exam
            </button>
          </div>

          <div className="created-exams">
            <h2>Your Created Exams</h2>
            <hr />
            <div className="created-exam">
              {exams.length === 0 ? (
                <p>No exams created yet.</p>
              ) : (
                exams.map((exam) => (
                  <div key={exam.id} className="exam-card">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/immigration-process/273/migrate-migration-004-1024.png"
                      alt="Exam image"
                      className="exam-image"
                    />
                    <hr />
                    <div className="exam-header">
                      <h3>{exam.testPaperName}</h3>
                      <div className="menu-container">
                        <TiThMenu className="menu-icon" onClick={() => toggleMenu(exam.id)} />
                        {openMenuId === exam.id && (
                          <div className="dropdown-menu">
                            <button onClick={handleOpenGroupModal}>Post in Group</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="subject">Subject : {exam.subject}</p>
                    <p className="numQuestions">📄 Questions: {exam.numQuestions}</p>
                    <p className="time-allotted">⏳ Time: {exam.timeAllowed} mins</p>

                    {exam.examType === "online-test" ? (
                      <button onClick={() => openInstructionsModal(exam.examLink)}>Take Exam</button>
                    ) : (
                      <button className="pdf-btn" onClick={() => generatePDF(exam.questions, exam.testPaperName)}>
                        📄 Download PDF
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal for Exam Instructions */}
      {showInstructions && (
        <div className="instruction-modal-overlay">
          <div className="instructrion-modal-content">
            <h2  >Exam Instructions</h2>
            <p>
              📌 Ensure a stable internet connection throughout the test to
              avoid interruptions.
            </p>
            <p>
              📌 Do not refresh, close, or navigate away from the exam page, as
              this may result in automatic submission or disqualification.
            </p>
            <p>
              📌 The timer starts as soon as you begin the exam and cannot be
              paused. Manage your time wisely.
            </p>
            <p>
              📌 Answer all questions carefully before submitting. Unanswered
              questions may impact your final score.
            </p>
            <p>
              📌 This test is proctored. Your activities may be monitored during
              the exam to ensure fair conduct.
            </p>
            <p>
              📌 Switching to other tabs is strictly prohibited. If detected,
              the system may auto-submit your test or disqualify you.
            </p>
            <p>
              📌 Full Screen Mode will be enabled once the exam begins. Exiting
              full-screen mode may lead to warnings or submission.
            </p>
            <p>
              📌Enable "Do Not Disturb" Mode to block all notifications during the test to minimize
              distractions. Ensure your device is set accordingly.
            </p>
            <p>
              📌 You may or may not be allowed to retake this test based on exam
              policies.
            </p>

            <div className="instruction-checkbox-container">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <label htmlFor="agree">I agree to the instructions</label>
            </div>

            <button onClick={handleTakeExam} disabled={!agreed}>
              Proceed to Exam
            </button>
            <button onClick={() => setShowInstructions(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Exams;
