import React, { useState } from "react";
import "./Feedback.css";

function Feedback() {
    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle feedback submission logic here (e.g., send to API)
        setSubmitted(true);
    };

    return (
        <div className="feedback-container">
            <h1>Provide Your Feedback</h1>
            {submitted ? (
                <div className="thank-you-message">
                    <h2>Thank you for your feedback!</h2>
                    <p>Your feedback helps us improve the Online Examination System.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-group">
                        <label htmlFor="rating">Rate the Exam System:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            <option value="">Select Rating</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">Additional Comments:</label>
                        <textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Your suggestions or feedback..."
                            rows="4"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit Feedback
                    </button>
                </form>
            )}
        </div>
    );
}

export default Feedback;
