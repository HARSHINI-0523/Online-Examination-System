import "./ExamPage.css"
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import * as faceapi from "face-api.js";

function ExamPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null); // Store camera stream globally
  const [faceDetected, setFaceDetected] = useState(true);
  // Load Face API Models
  const loadFaceAPI = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    detectFace();
  };

  // Face Detection Function
  const detectFace = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      if (detections.length > 0) {
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
        alert("⚠️ No face detected! Please stay in front of the camera.");
      }
    }, 3000); // Check every 3 seconds
  };
  const startCamera = async () => {
    try {

     
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 }, // Lower resolution for faster access
    });
    
      console.log("Camera Stream:", stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play(); // Ensure video plays
      }

      setCameraStream(stream); // Save the camera stream to keep it active
      setCameraEnabled(true);
      setTimerStarted(true); // Start timer only when the camera is on
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("⚠️ Camera access is required to proceed with the exam.");
      setTimeout(startCamera, 2000); // Retry camera access after 2 seconds
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        console.log(examId);
        const res = await API.get(`/exams/get-exam/${examId}`);
        console.log(res);
        setExam(res.data);
        setTimeLeft(res.data.timeAllowed * 60); // Convert minutes to seconds
      } catch (error) {
        console.error("Failed to load exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  // Timer countdown logic - only starts when camera is enabled
  useEffect(() => {
    if (!timerStarted || timeLeft === null) return;
    if (timeLeft === 0) {
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerStarted]);

  // Function to submit the exam when time is up
  const handleSubmitExam = () => {
    alert("Time's up! Your exam is being submitted.");
    // Add actual submit logic here
  };

  // Format time into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) return <p>Loading exam...</p>;
  if (!exam) return <p>Exam not found.</p>;

  return (
    <div className="exam-container">
      <h1>{exam.testPaperName}</h1>
      <p><strong>Subject:</strong> {exam.subject}</p>
      <p><strong>Time Allowed:</strong> {exam.timeAllowed} minutes</p>
      <p><strong>Instructions:</strong> {exam.generalInstructions}</p>

      {/* Display time left only when the camera is enabled */}
      {cameraEnabled && <h2>Time Left: {formatTime(timeLeft)}</h2>}

      {!cameraEnabled ? (
        <p>⚠️ Please enable your camera to proceed with the exam.</p>
      ) : !faceDetected ? (
        <p>⚠️ No face detected! Please stay in front of the camera.</p>
      ) : (
        <>
          <div className="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              
            ></video>
          </div>
          {exam.questions.map((q, index) => (
            <div key={q.id} className="question">
              <p><strong>Q{index + 1}:</strong> {q.question}</p>
              {q.options?.map((opt, i) => (
                <label key={i}>
                  {opt}
                  <input type="radio" name={`q${index}`} value={opt} />
                  
                </label>
              ))}
            </div>
          ))}
          <button>Submit Exam</button>
        </>
      )}
    </div>
  );
}

export default ExamPage;
