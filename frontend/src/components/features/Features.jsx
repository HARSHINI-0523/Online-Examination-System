import React from "react";
import { motion } from "framer-motion";
import "./Features.css"; // Make sure this file exists and is properly styled

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const features = [
  {
    img: "data:image/jpeg;base64,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",
    title:"Study Buddies",
    desc:"Collaborate with your peers,share resources,and help each other ace the exams."
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfXIFJq0I9sGHALRGf3m44PK9fDEYLK3YHqw&s",
    title: "Instant Online Tests",
    desc: "Take mock exams anytime, anywhere. Get instant feedback on your performance to improve your preparation."
  },
  {
    img: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Real-Time Performance Analysis",
    desc: " Get detailed insights into your performance with real-time analytics that help you track your progress."
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8L2jzD5Up-AQGHlkdZp3qbtzzgzfDDCQq5w&s",
    title: "Secure and Fair Exams",
    desc: "Our platform ensures a secure exam environment with AI-based proctoring and anti-cheating measures."
  }
];

export default function Features() {
  return (
    <div className="features-container">
      {/* Header Section */}
      <motion.header
        className="feature-page-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1>Online Examination System Features</h1>
        <p>Explore our platform's amazing features to enhance your learning and exam experience.</p>
      </motion.header>

      {/* Feature Cards Section */}
      <section className="feature-card-container">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img src={feature.img} alt={feature.title} className="feature-image" />
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Exam Monitoring Section */}
      <motion.section
        className="exam-monitor-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="text-content">
          <h2>Real-Time Exam Monitoring</h2>
          <p>Watch exams live. See the current activity of candidates, such as taking (live), completed, and dropped exams with their number of attempts, device name, browser, operating system, IP address, and location details.</p>
        </div>
        <div className="image-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tuhsTzSxxu9FiVBzHuR3Y6LSM-4cxi3QQw&s" alt="Exam Monitor Dashboard" />
        </div>
      </motion.section>

      {/* Study Buddy Section */}
      <motion.section
        className="study-bud-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="image-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4Ql4jWLi4XTnFT9X0sxSDOICbiX-fHEN0g&s" alt="Study Bud Feature" />
        </div>
        <div className="text-content">
          <h2>Find Your Perfect Study Buddy</h2>
          <p>Match based on subjects, learning styles, and goals. Connect with like-minded learners and find your ideal study partner.</p>
        </div>
      </motion.section>

      <motion.section
  className="notifications-container"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInUp}
>
  <div className="text-content">
    <h2>Stay Updated with Notifications</h2>
    <p>Never miss an important update! Get real-time alerts for:</p>
    <ul>
      <li>📅 Exam schedules, deadlines, and reschedules.</li>
      <li>📊 Instant results and performance insights.</li>
      <li>🔔 Important guidelines and security updates.</li>
    </ul>
    <p>Choose to receive notifications via push alerts, email, or SMS.</p>
  </div>
  <div className="image-container">
    <img src="https://media.istockphoto.com/id/684900740/photo/market-research-survey-concept.jpg?s=1024x1024&w=is&k=20&c=Vc54ljJ2iwiNnkJGcjSaezQL8RmmOvGIImN4EDPyQgs=" alt="Notifications Feature" />
  </div>
</motion.section>
    </div>
  );
}