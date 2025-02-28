import "./AboutUs.css";
import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const AboutUs = () => {
  return (
    <div className="container">
      {/* Heading Section */}
      <div className="heading">
        <Typewriter
          options={{
            strings: ["About Our Platform"],
            autoStart: true,
            loop: true,
            delay: 50,
            cursor: "",
          }}
        />
      </div>

      {/* Intro Section */}
      <div className="section">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="info-box"
        >
          <p>
            Our platform is designed to revolutionize the way students take
            exams and institutions conduct assessments. We provide a seamless,
            secure, and user-friendly experience for students, administrators,
            and study groups, ensuring a smooth and efficient examination
            process.
          </p>
        </motion.div>
        <motion.img
          src="https://cdni.iconscout.com/illustration/premium/thumb/business-people-discussing-on-project-illustration-download-in-svg-png-gif-file-formats--employee-doing-discussion-communication-pack-illustrations-6778290.png"
          alt="Exam System"
          className="image"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </div>

      {/* Mission Section */}
      <motion.h2
        className="subheading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Our Mission
      </motion.h2>
      <div className="section">
        <motion.img
          src="https://img.freepik.com/free-vector/grades-concept-illustration_114360-5958.jpg"
          alt="Our Mission"
          className="image"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.div
          className="info-box"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <p>
            The Online Examination System was built to transform the way
            students take tests and how institutions manage assessments.
            Traditional exams often come with logistical challenges, security
            concerns, and inefficiencies—we set out to solve these problems by
            creating a seamless, secure, and intelligent online exam platform.
            Whether you're a student preparing for an important test, an
            administrator managing multiple assessments, or part of a study
            group looking to collaborate effectively, our system is designed to
            provide a stress-free, efficient, and engaging examination
            experience.
          </p>
        </motion.div>
      </div>

      {/* Services Section */}
      <motion.h2
        className="subheading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Our Services
      </motion.h2>
      <div className="services-container">
        {[
          {
            title: "Administrators",
            info: "Easily create and manage exams with customizable settings, automated performance tracking.",
          },
          {
            title: "Students",
            info: "Enjoy a user-friendly interface with demo tests, instant performance analysis, and access to past tests.",
          },
          {
            title: "Study Buds",
            info: "Collaborate with peers, create custom tests, and engage in interactive learning through group-based exam sessions.",
          },
          {
            title: "Proctors",
            info: "Live monitoring and AI-based security alerts.",
          },
        ].map((service, index) => (
          <motion.div key={index} className="service-box">
            <div className="service-inner">
              <div className="service-front">{service.title}</div>
              <div className="service-back">{service.info}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Our Team Section */}
      <motion.h2
        className="subheading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Our Team
      </motion.h2>
      <div className="team-container">
        {[
          {
            img: "https://img.freepik.com/premium-vector/businesswoman-working-laptop-office-desk-vector-illustration-cartoon-style_1142-88331.jpg",
            info: "A passionate developer and problem-solver. With expertise in web technologies and database management, ensures seamless platform performance and user-friendly functionality.",
            direction: "left",
          },
          {
            img: "https://static.vecteezy.com/system/resources/previews/044/448/931/non_2x/cartoon-character-with-the-desk-working-concept-illustration-free-png.png",
            info: "An expert in backend systems and ensures the platform remains secure and efficient. They specialize in authentication to maintain system reliability.",
            direction: "left",
          },
          {
            img: "https://static.vecteezy.com/system/resources/previews/044/428/120/non_2x/business-woman-illustration-on-transparent-background-free-png.png",
            info: "Bringing creativity to the team. From designing visually appealing layouts to ensuring smooth navigation, they make the platform both accessible and aesthetically pleasing.",
            direction: "left",
          },
          {
            img: "https://img.freepik.com/premium-vector/young-woman-working-laptop-home-vector-illustration-cartoon-style_1142-72434.jpg",
            info: "Ensures that the platform aligns with the latest trends in online examinations. Focus on documentation and user guides, making the system easy to understand and implement.",
            direction: "left",
          },
        ].map((member, index) => (
          <div key={index} className="team-section">
            <motion.img
              src={member.img}
              alt="Team Member"
              className="team-image"
              initial={{ x: member.direction === "left" ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.div
              className="team-info-box"
              initial={{ x: member.direction === "left" ? 100 : -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <p>{member.info}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
