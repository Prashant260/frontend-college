// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Section 1: Logo & About */}
        <div className="footer-column">
          <h2 className="footer-logo">College Duniya</h2>
          <p>
            India’s leading platform for college discovery, admission guidance, 
            and career planning. Explore top colleges, courses, and exams.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        {/* <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/colleges">All Colleges</Link></li>
            <li><Link to="/exams">Exams</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/reviews">Write a Review</Link></li>
          </ul>
        </div> */}

        {/* Section 3: Top Streams */}
        {/* <div className="footer-column">
          <h3>Top Streams</h3>
          <ul>
            <li><a href="#engineering">Engineering</a></li>
            <li><a href="#medical">Medical</a></li>
            <li><a href="#management">Management</a></li>
            <li><a href="#law">Law</a></li>
            <li><a href="#commerce">Commerce</a></li>
            <li><a href="#arts">Arts & Humanities</a></li>
          </ul>
        </div> */}

        {/* Section 4: Contact & Newsletter */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p><i className="fas fa-envelope"></i> support@collegeduniya.com</p>
          <p><i className="fas fa-phone"></i> +91 98765 43210</p>
          <p><i className="fas fa-map-marker-alt"></i> New Delhi, India</p>

          {/* <div className="newsletter">
            <h4>Subscribe to Newsletter</h4>
            <form>
              <input type="email" placeholder="Your Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div> */}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2025 College Duniya. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;