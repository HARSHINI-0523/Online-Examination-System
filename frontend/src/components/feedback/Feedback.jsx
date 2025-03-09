import React, { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [uiRating, setUiRating] = useState("");
  const [navigationRating, setNavigationRating] = useState("");
  const [performanceRating, setPerformanceRating] = useState("");
  const [securityRating, setSecurityRating] = useState("");
  const [supportRating, setSupportRating] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };



  return (
    <div className="feedback-container">
      {submitted ? (
        <div className="thank-you-message">
          <h2>🎉 Thank you for your feedback! 🎉</h2>
          <p>Your input helps us improve the Online Examination System.</p>
        </div>
      ) : (
        <div className="feedback-form-container">
          <h1>Provide Your Feedback</h1>
          <form onSubmit={handleSubmit} className="feedback-form">
            {/* UI Rating */}
            <div className="form-group">
              <label htmlFor="ui-rating">
                How do you rate the UI design? 🎨
              </label>
              <select
                id="ui-rating"
                value={uiRating}
                onChange={(e) => setUiRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">⭐ - Poor</option>
                <option value="2">⭐⭐ - Fair</option>
                <option value="3">⭐⭐⭐ - Good</option>
                <option value="4">⭐⭐⭐⭐ - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
              </select>
            </div>

            {/* Navigation Rating */}
            <div className="form-group">
              <label htmlFor="navigation-rating">
                Was the system easy to navigate? 🧭
              </label>
              <select
                id="navigation-rating"
                value={navigationRating}
                onChange={(e) => setNavigationRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">⭐ - Confusing</option>
                <option value="2">⭐⭐ - Slightly Difficult</option>
                <option value="3">⭐⭐⭐ - Manageable</option>
                <option value="4">⭐⭐⭐⭐ - Easy</option>
                <option value="5">⭐⭐⭐⭐⭐ - Very Easy</option>
              </select>
            </div>

            {/* Performance Rating */}
            <div className="form-group">
              <label htmlFor="performance-rating">
                How would you rate the system's speed & performance? ⚡
              </label>
              <select
                id="performance-rating"
                value={performanceRating}
                onChange={(e) => setPerformanceRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">🐢 - Very Slow</option>
                <option value="2">🐌 - Somewhat Slow</option>
                <option value="3">🚶 - Average</option>
                <option value="4">🏃‍♂️ - Fast</option>
                <option value="5">🚀 - Super Fast</option>
              </select>
            </div>

            {/* Security Rating */}
            <div className="form-group">
              <label htmlFor="security-rating">
                How secure do you feel using the system? 🔒
              </label>
              <select
                id="security-rating"
                value={securityRating}
                onChange={(e) => setSecurityRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">🚨 - Not Secure</option>
                <option value="2">⚠️ - Needs Improvement</option>
                <option value="3">🔐 - Somewhat Secure</option>
                <option value="4">🛡️ - Secure</option>
                <option value="5">🦾 - Very Secure</option>
              </select>
            </div>

            {/* Support Rating */}
            <div className="form-group">
              <label htmlFor="support-rating">
                How satisfied are you with the help & support options? 📖
              </label>
              <select
                id="support-rating"
                value={supportRating}
                onChange={(e) => setSupportRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">🙁 - Poor</option>
                <option value="2">😕 - Fair</option>
                <option value="3">😐 - Average</option>
                <option value="4">🙂 - Good</option>
                <option value="5">😀 - Excellent</option>
              </select>
            </div>

            {/* Additional Comments */}
            <div className="form-group">
              <label htmlFor="comments">Additional Comments 🗨️</label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Your suggestions or feedback..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="feedback-submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Feedback;
