import React, { useEffect, useState } from "react";
import API from "../../api/axios"; // Adjust API import
import "./DetailedAnalysis.css";

const DetailedAnalysis = () => {
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await API.get("/exams/detailed-analysis", { withCredentials: true });
        if (response.status === 200) {
          setAnalysis(response.data);
        } else {
          setError("Failed to fetch detailed analysis.");
        }
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Error fetching detailed analysis. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) return <div className="loading">Loading analysis...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="detailed-analysis-container">
      <h2>Detailed Exam Analysis</h2>
      {analysis.map((entry, index) => (
        <div key={index} className="analysis-card">
          <p><strong>Exam:</strong> {entry.examId?.testPaperName}</p>
          <p><strong>Score:</strong> {entry.score} / {entry.totalMarks}</p>
          <p><strong>Submission Time:</strong> {new Date(entry.submissionTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailedAnalysis;
