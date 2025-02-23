import "./Home.css";
import { CgMail } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import Lottie from "react-lottie";
import onlinetest from "../../assets/Animations/onlinetest.json";
import { IoCheckbox } from "react-icons/io5";
import Typed from 'typed.js';
import {useEffect,useRef} from 'react';
import { AnimatedOnScroll } from "react-animated-css-onscroll";

function Home() {
  const el = useRef(null);

  const defaultOptionsOT = {
    loop: true,
    autoplay: true,
    animationData: onlinetest,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    //Typing effect
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: [
          "Secure",
          "Reliable",
          "Efficient",
          "User Friendly",
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true, 
      });

      return () => {
        typed.destroy(); 
      };
    }

    
  }, []);
  
  return (
    <div>
      <div className="home-body">
        <div className="about ">
          <span ref={el} className="auto-typed"></span>
         Online <span className="span-ele">Examination</span> System 
        </div>
        <div>
          <Lottie options={defaultOptionsOT} height={550} width={500} />
        </div>
      </div>

      <div className="Features">
        <div className="features-head">
          Key <span className="span-ele">Features</span> of OES
        </div>

        <div className="feature-pts">
        <AnimatedOnScroll  animationIn="fadeInLeft" animateOnce={true}>
          <div className="pt">
            <h3>Proctored Test</h3>
            
            <ul>
              <li>
                <h6>Webcam Monitoring </h6>
              </li>
              <li>
                <h6>AI-Based Cheating Detection</h6>
                
              </li>
              <li>
                <h6>Browser Lockdown</h6>
                
              </li>
              <li>
                <h6>Environment Monitoring</h6>
                
              </li>
            </ul>
          </div>
          </AnimatedOnScroll>
          <div className="feature-img">
            <img
              src="https://www.testinvite.com/tif/gb/images/hero/proctored-exam-with-webcam-and-screen-recording-lockdown-browser.webp"
              alt="Proctoring test"
            />
          </div>
        </div>
        <div className="feature-pts">
          <div className="feature-img">
            <img
              src="https://www.alloysoftware.com/wp-content/uploads/2020/06/performance-analytics-personalized.svg"
              alt="Performance Analytics image"
            />
          </div>
          <AnimatedOnScroll  animationIn="fadeInRight" >
          <div className="pt">
            <h3>Test Analytics</h3>
            <ul>
              <li>
                <h6>Instant Score Calculation</h6>
              </li>
              <li>
                <h6>Performance Analytics</h6>
              </li>
              <li>
                <h6>Comparative Analysis</h6> 
              </li>
             
            </ul>
          </div>
          </AnimatedOnScroll>
        </div>

        <div className="feature-pts">
        <AnimatedOnScroll  animationIn="fadeInLeft">
          <div className="pt">
            <h3>Secure Browser</h3>
           
            <ul>
              <li>
                <h6>Full-Screen Mode Enforcement</h6> 
              </li>
              <li>
                <h6>URL & Website Restrictions</h6>
              </li>
              <li>
                <h6>Prevents Multiple Device Use</h6> 
              </li>
              <li>
                <h6>Disables Keyboard Shortcuts</h6> 
              </li>
            </ul>
          </div>
          </AnimatedOnScroll>
          <div className="feature-img">
            <img
              src="https://www.thinkexam.com/images_newtheme/remoteproctoring/securebrowser.png"
              alt="Secure Browser"
            />
          </div>
         
        </div>
        

      </div>
      
      
    </div>
  );
}

export default Home;