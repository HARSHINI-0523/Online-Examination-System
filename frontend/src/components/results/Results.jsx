import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios"; // Adjust the import based on your API setup
import "./Results.css";

const Results = () => {
  const { examId } = useParams(); // Get exam ID from URL
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await API.get(`/exams/results/${examId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setResult(response.data);
        } else {
          setError("Failed to fetch results.");
        }
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Error fetching results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [examId]);

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error">{error}</div>;

  // Convert responses object to array for mapping
  const responseArray = Object.entries(result.responses).map(([questionId, answer]) => ({
    question: questionId, // Use questionId or fetch question details from backend if needed
    answer,
    correct: answer === 1, // Assuming '1' means correct, adjust logic as needed
  }));

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      <div className="result-card">
        <p><strong>Exam:</strong> {result.examTitle}</p>
        <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
        <p><strong>Submission Time:</strong> {new Date(result.submissionTime).toLocaleString()}</p>
      </div>

      <h3>Your Responses</h3>
      <div className="responses-list">
        {responseArray.map((response, index) => (
          <div key={index} className="response-item">
            <p><strong>Question {index + 1}:</strong> {response.question}</p>
            <p><strong>Your Answer:</strong> {response.answer}</p>
            <p className={response.correct ? "correct" : "incorrect"}>
              {response.correct ? "✅ Correct" : "❌ Incorrect"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
