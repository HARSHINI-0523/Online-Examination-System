import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

function ExamPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        console.log(examId);
        const res = await API.get(`/exams/get-exam/${examId}`);
        console.log(res);
        setExam(res.data);
      } catch (error) {
        console.error("Failed to load exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  if (loading) return <p>Loading exam...</p>;
  if (!exam) return <p>Exam not found.</p>;

  return (
    <div className="exam-container">
      <h1>{exam.testPaperName}</h1>
      <p><strong>Subject:</strong> {exam.subject}</p>
      <p><strong>Time Allowed:</strong> {exam.timeAllowed} minutes</p>
      <p><strong>Instructions:</strong> {exam.generalInstructions}</p>
      
      {exam.questions.map((q, index) => (
        <div key={q.id} className="question">
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          {q.options?.map((opt, i) => (
            <label key={i}>
              <input type="radio" name={`q${index}`} value={opt} />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button>Submit Exam</button>
    </div>
  );
}

export default ExamPage;
