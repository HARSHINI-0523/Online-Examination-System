import "./Home.css"
import { CgMail } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import Lottie from "react-lottie";
import onlinetest from "../../assets/Animations/onlinetest.json";
import ProctoringAnimation from "../../assets/Animations/ProctoringAnimation.json";
function Home() {

    const defaultOptionsOT = {
        loop: true,
        autoplay: true,
        animationData: onlinetest,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const defaultOptionsPA = {
        loop: true,
        autoplay: true,
        animationData: ProctoringAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };



    return (
        <div>
            <div className="home-header flex">
                <div className="website-name"><a href="/" style={{ color: "black" }}>OES</a></div>
                <div className="header-option">
                    Features <span className="header-arrow">&#9662;</span>
                </div>
                <div className="header-option">
                    About us <span className="header-arrow">&#9662;</span>
                </div>
                <div className="header-option dropdown">
                    <div className="dropdown-toggle" data-bs-toggle="dropdown">
                        Contact us
                    </div>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">gmail<CgMail style={{ marginLeft: "2px" }} /></a></li>
                        <li><a className="dropdown-item" href="https://www.linkedin.com/in/anjusri-kandi">linkedIn<FaLinkedin style={{ marginLeft: "2px" }} /></a></li>
                    </ul>
                </div>


                <div className="header-option">
                    Login
                </div>

                <div className="header-option">
                    <button className="btn btn-primary ">Take Demo Test</button>
                </div>

            </div>

            <div className="home-body">
                <div className="about">A Secure, Reliable, Efficient, and User-Friendly Online <span className="span-ele">Examination</span> System

                </div>
                <div>
                    <Lottie
                        options={defaultOptionsOT}
                        height={550}
                        width={500}
                    />
                </div>
            </div>

            <div className="Features">
                <div className="features-head">Key <span className="span-ele">Features</span> of OES</div>
                {/* <div className="guide">
                    <img src="https://cdn.prod.website-files.com/62f0b227e38c6d799afcd8ba/673de64b40bcd4600e8843d6_66cd8bfae1badc70790263b1_65e032696b8702a2882f3589_Online%252520Proctoring-min.png" alt="exam-guide" />
                </div> */}
                <div className="feature-pts">
                    <div className="pt">
                        <h3>Proctored Test</h3>
                        <p>Key Features of Proctored Test: </p>
                        <ul>
                            <li><h6>Webcam Monitoring </h6> – The candidate’s video is recorded.</li>
                            <li><h6>AI-Based Cheating Detection</h6> – Uses facial recognition and behavior tracking.</li>
                            <li><h6>Browser Lockdown</h6> – Prevents students from switching tabs or opening new windows.</li>
                            <li> <h6>Audio & Environment Monitoring</h6> – Detects background noise or additional people in the room.</li>
                        </ul>
                    </div>
                    <div className="feature-img">
                        <img src="https://www.testinvite.com/tif/gb/images/hero/proctored-exam-with-webcam-and-screen-recording-lockdown-browser.webp" alt="Proctoring test" />
                    </div>

                </div>
                <div className="feature-pts">
                    <div className="feature-img1">
                        <img src="https://www.alloysoftware.com/wp-content/uploads/2020/06/performance-analytics-personalized.svg" alt="Performance Analytics image" />
                    </div>
                    <div className="pt1">
                        <h3>Automated Test Reporting & Analytics</h3>
                        <p>Key Features of Automated Test Reporting & Analytics: </p>
                        <ul>
                            <li><h6>Instant Score Calculation</h6> – Automatically evaluates answers and provides immediate results.</li>
                            <li><h6>Performance Analytics</h6> – Tracks accuracy, speed, and consistency of students.</li>
                            <li><h6>Comparative Analysis</h6> – Compares individual performance with class averages, peers, or past test records.</li>
                            <li> <h6>Audio & Environment Monitoring</h6> – Uses charts, heatmaps, and graphs to represent performance trends.</li>
                        </ul>
                    </div>

                </div>

                <div className="feature-pts">
                    <div className="pt">
                        <h3>Secure Browser</h3>
                        <p>Key Features of a Secure Browser: </p>
                        <ul>
                            <li><h6>Full-Screen Mode Enforcement</h6> – Forces the exam to run in full-screen mode.</li>
                            <li><h6>URL & Website Restrictions</h6> – Blocks Google Search, YouTube, social media, and other external websites.</li>
                            <li><h6>Prevents Multiple Device Use</h6> – Detects if a student tries to use a second device (phone, tablet) to cheat.</li>
                            <li> <h6>Disables Keyboard Shortcuts & Developer Tools</h6> – Prevents the use of CTRL + C (copy), CTRL + V (paste), ALT + Tab .</li>
                        </ul>
                    </div>
                    <div className="feature-img">
                        <img src="https://www.thinkexam.com/images_newtheme/remoteproctoring/securebrowser.png" alt="" />
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Home;