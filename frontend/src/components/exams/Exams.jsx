import "./Exams.css";
import { useContext, useState, useEffect } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import API from "../../api/axios";
import QuestionTypes from "../questions/QuestionTypes"; // Import the QuestionTypes component
import jsPDF from 'jspdf';
import { v4 as uuidv4 } from "uuid"; // Import for unique exam link

function Exams() {
  const { currentUser } = useContext(userLoginContext);
  const [exams, setExams] = useState([]);
  const [step, setStep] = useState(0);
  const [examType, setExamType] = useState("question-paper");
  const [education, setEducation] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState(""); // Added Class Field
  const [testPaperName, setTestPaperName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [timeAllowed, setTimeAllowed] = useState("");
  const [generalInstructions, setGeneralInstructions] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showExamTypePopup, setShowExamTypePopup] = useState(false);
  const [warning, setWarning] = useState("");
  const [savedQuestions, setSavedQuestions] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await API.get("/exams/teacher-get-exams", {
          withCredentials: true,
        });
        setExams(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
  }, []);

  // Validate Step 1 Before Proceeding
  const handleNextStep = () => {
    if (!education || !subject || !testPaperName || !numQuestions || !timeAllowed || !termsAccepted) {
      setWarning("Please fill in all fields and accept the Terms of Use.");
    } else {
      setWarning("");
      setStep(2); // Proceed to Step 2 (Add Questions)
    }
  };

  // Save questions from QuestionTypes component
  const handleSaveQuestion = (newQuestion) => {
    setSavedQuestions([...savedQuestions, newQuestion]);
  };

  // Save questions received from QuestionTypes.jsx
  const handlePublishExam = (questions) => {
    setSavedQuestions(questions);
    setStep(3); // Move to step 3 (Preview & Create Quiz)
  };

  // Submit Exam (Final Step)
  const handleSubmitExam = async () => {
    try {

      let examLink = "";

      if (examType === "online-test") {
        // Generate a unique exam link
        examLink = `https://exam-platform.com/exam/${uuidv4()}`;
      }

      const examData = {
        createdBy: currentUser?.id,
        education,
        classLevel,
        subject,
        testPaperName,
        numQuestions,
        timeAllowed,
        generalInstructions,
        examType,
        questions: savedQuestions,
      };

      const res = await API.post("/exams/create", examData, { withCredentials: true });

      if (res.status === 201) {
        if (examType === "question-paper") {
          generatePDF(savedQuestions, testPaperName);
        } else {
          alert(`Exam created successfully! Exam link: ${examLink}`);
        }
  
        setStep(0); // Reset to home after submission
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create exam. Please try again.");
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
  
  // const handleDelete = (examId) => {
  //   // Remove the exam from the list
  //   setExams(exams.filter(exam => exam.id !== examId));
  // };

  return (
    <div className="exams-container">
      <h1 className="exam-heading">Exams</h1>

      {step === 0 && (
        <div className="exam-intro">
          <p>Click the button to conduct a new exam</p>
          <button className="create-exam-btn" onClick={() => setStep(1)}>
            Create Exam
          </button>
        </div>
      )}

      {/* Display Created Exams List */}
          {step === 0 && (
          <div className="created-exams">
            <h2>Your Created Exams</h2>
            {exams.length === 0 ? (
              <p>No exams created yet.</p>
            ) : (
              exams.map((exam) => (
                <div key={exam.id} className="exam-item">
                  <p><strong>{exam.testPaperName}</strong> - {exam.subject}</p>
                  {exam.examType === "online-test" ? (
                    <a href={exam.examLink} target="_blank" rel="noopener noreferrer">
                      Exam Link: {exam.examLink}
                    </a>
                  ) : (
                    <button onClick={() => generatePDF(exam.questions, exam.testPaperName)}>
                      Download PDF
                    </button>
                  )}
                  {/* <button className="delete-btn" onClick={() => handleDelete(exam.id)}>
                    Delete
                  </button> */}
                </div>
              ))
            )}
          </div>
        )}

      {step > 0 && (
        <div className="create-exam">
          <h2>Create a New Test</h2>

          <div className="steps">
            <div className={step === 1 ? "active" : ""}>1. Create a New Test</div>
            <div className={step === 2 ? "active" : ""}>2. Add Questions</div>
            <div className={step === 3 ? "active" : ""}>3. Preview & Create Quiz</div>
          </div>

          {/* Step 1: Exam Setup */}
          {step === 1 && (
            <div className="exam-form">
              <label>Education</label>
              <select value={education} onChange={(e) => setEducation(e.target.value)}>
                <option value="">Select Education</option>
                <option value="School">School</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Engineering">Engineering</option>
                <option value="Others">Others</option>
              </select>

              <label>Class</label>
              <input type="text" value={classLevel} onChange={(e) => setClassLevel(e.target.value)} placeholder="Enter Class" />

              <label>Subject</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter Subject" />

              <div className="test-paper-label">
                <span>
                  Test Paper Type
                  <button className="info-btn" onClick={() => setShowExamTypePopup(true)}>What is this?</button>
                </span>
              </div>

              {showExamTypePopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h3>Test Paper Type Information</h3>
                    <p><strong>Question Paper (PDF):</strong> This is a normal question paper in PDF format. You will also get a separate solution PDF. Best suitable for offline exams.</p>
                    <p><strong>Online Test (Link):</strong> This is an online test with only objective questions such as MCQ, T/F, Fill-ups and One-word answers. Here, the result will be automatically generated.</p>
                    <button className="close-btn" onClick={() => setShowExamTypePopup(false)}>Close</button>
                  </div>
                </div>
              )}

              <div className="radio-group">
                <label>
                  <input type="radio" value="question-paper" checked={examType === "question-paper"} onChange={() => setExamType("question-paper")} />
                  Question Paper (PDF)
                </label>
                <label>
                  <input type="radio" value="online-test" checked={examType === "online-test"} onChange={() => setExamType("online-test")} />
                  Online Test (Link)
                </label>
              </div>

              <label>Test Paper Name</label>
              <input type="text" value={testPaperName} onChange={(e) => setTestPaperName(e.target.value)} placeholder="Enter Test Paper Name" />

              <label>Number of Questions</label>
              <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} placeholder="Enter number of questions" />

              <label>Time Allowed (minutes)</label>
              <input type="number" value={timeAllowed} onChange={(e) => setTimeAllowed(e.target.value)} placeholder="Enter time in minutes" />

              <label>General Instructions</label>
              <textarea value={generalInstructions} onChange={(e) => setGeneralInstructions(e.target.value)} placeholder="Enter instructions..." rows="3"></textarea>

              <div className="terms-container">
                <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                <span>
                  I have read and agree to the
                  <button className="terms-btn" onClick={() => setShowTermsPopup(true)}>Terms of Use</button>
                </span>
              </div>

              {warning && <p className="warning">{warning}</p>}

              <button className="next-btn" onClick={handleNextStep}>Next</button>
            </div>
          )}
          {/* Popup for Terms of Use */}
          {showTermsPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Terms of Use for Exam Writing</h3>
                <ul>
                  <li><strong>Personal and Non-Commercial Use:</strong> The question papers generated are for personal use only.</li>
                  <li><strong>Content and Copyright Restrictions:</strong> Unauthorized names, logos, and copyrighted materials are prohibited.</li>
                  <li><strong>Usage Limitations:</strong> Maximum 50 questions per paper and up to 30 papers per day.</li>
                  <li><strong>License and Restrictions:</strong> No modification, copying, or commercial use.</li>
                  <li><strong>Policy on Violations and Termination:</strong> Violations may lead to account termination.</li>
                </ul>
                <button className="close-btn" onClick={() => setShowTermsPopup(false)}>Close</button>
              </div>
            </div>
          )}

          {step === 2 && <QuestionTypes onSaveQuestion={handleSaveQuestion} onPublish={handlePublishExam} />}

          {step === 3 && (
            <div className="preview-container">
              <h3>Preview Your Test</h3>
              {/* Display Step 1 Exam Details */}
              <div className="exam-preview">
                <h4>Exam Details</h4>
                <p><strong>Education:</strong> {education}</p>
                <p><strong>Class:</strong> {classLevel}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Test Paper Name:</strong> {testPaperName}</p>
                <p><strong>Number of Questions:</strong> {numQuestions}</p>
                <p><strong>Time Allowed:</strong> {timeAllowed} minutes</p>
                <p><strong>General Instructions:</strong> {generalInstructions || "No instructions provided"}</p>
              </div>

              {/* Display Saved Questions from Step 2 */}
              <div className="questions-preview">
                <h4>Preview Questions</h4>
                {savedQuestions.length === 0 ? (
                <p>No questions added yet.</p>
              ) : (
                <ul className="preview-list">
                  {savedQuestions.map((q, index) => (
                    <li key={q.id} className="preview-question">
                      <strong>Q{index + 1}:</strong> {q.question}

                      {/* Display answer options */}
                      {q.type === "true-false" ? (
                        <p>
                          <strong>Correct Answer:</strong>{" "}
                          <span className="correct">{q.correctAnswers[0]}</span>
                        </p>
                      ) : q.type === "fill-blank" ? (
                        <p>
                          <strong>Correct Answer:</strong>{" "}
                          <span className="correct">{q.correctAnswers[0]}</span>
                        </p>
                      ) : q.type === "ordering" ? (
                        <>
                          <p><strong>Arrange in order:</strong></p>
                          <ul>
                            {q.options.map((opt, i) => (
                              <li key={i} className="ordered-option">{opt}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <>
                          <p><strong>Options:</strong></p>
                          <ul>
                            {q.options.map((opt, i) => (
                              <li key={i} className={q.correctAnswers.includes(i) ? "correct" : ""}>
                                {q.correctAnswers.includes(i) ? "✅ " : "❌ "} {opt}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {/* Explanation & Marks */}
                      <p><strong>Explanation:</strong> {q.explanation}</p>
                      <p><strong>Marks:</strong> {q.marks}</p>
                    </li>
                  ))}
                </ul>
              )}
              </div>
              <button onClick={handleSubmitExam} className="submit-btn">Create Exam</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Exams;
