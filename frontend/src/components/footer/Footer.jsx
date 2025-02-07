import "./Footer.css"
import { Link } from "react-router-dom";
function Footer() {
    return(
        <footer>
      <div className="contact-details">
        <div>
          <h5>Contact Us</h5>
          <p>Email: info@oes.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div>
          <h5>Follow Us</h5>
          <p><Link to="https://www.linkedin.com/in/jayanthi-bhukya-498029289/">LinkedIn</Link> | Twitter | <Link to="https://www.instagram.com/harshini_gopisetty/">Instagram</Link></p>
        </div>
        <div>
          <h5>Address</h5>
          <p>123 Street, City, Country</p>
        </div>
      </div>
    </footer>
    )
}

export default Footer;