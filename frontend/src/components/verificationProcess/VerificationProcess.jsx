import "./VerificationProcess.css";
import Lottie from "react-lottie";
import ProcessAnimation from "../../assets/Animations/ProcessAnimation.json";


function VerificationProcess() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ProcessAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    return (
        <div className="verification-process-container">
            <Lottie options={defaultOptions} height={600} width={500} />
            <div className="verification-message">
                Verification is in process...
            </div>
        </div>
    );
}

export default VerificationProcess;
