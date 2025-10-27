// src/components/ReviewImportance.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUsers, FaCheckCircle, FaLightbulb, FaHandsHelping } from 'react-icons/fa';
import './ReviewImportance.css'; // CSS file (नीचे दूंगा)

const ReviewImportance = () => {
  return (
    <div className="review-importance-page">
      <div className="hero-section" style={{backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1682974407026-581fe0e550ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sbGVnZSUyMHN0dWRlbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          overflow: 'hidden',margin: '20px',
          display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
        <h1>Why Your Review Matters</h1>
        <p>Your feedback helps thousands of students make the right choice.</p>
      </div>

      <div className="container">
        {/* Importance Cards */}
        <div className="importance-grid">
          <div className="card">
            <div className="icon"><FaUsers /></div>
            <h3>Help Future Students</h3>
            <p>Your honest review guides thousands of students in choosing the right college.</p>
          </div>

          <div className="card">
            <div className="icon"><FaCheckCircle /></div>
            <h3>Improve College Standards</h3>
            <p>Colleges use feedback to improve facilities, teaching, and campus life.</p>
          </div>

          <div className="card">
            <div className="icon"><FaLightbulb /></div>
            <h3>Share Real Experience</h3>
            <p>Tell others about placements, faculty, hostel, and hidden truths.</p>
          </div>

          <div className="card">
            <div className="icon"><FaHandsHelping /></div>
            <h3>Build Trust</h3>
            <p>Real reviews create a transparent education system for everyone.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat">
            <h2>50,000+</h2>
            <p>Reviews Submitted</p>
          </div>
          <div className="stat">
            <h2>1.2M+</h2>
            <p>Students Helped</p>
          </div>
          <div className="stat">
            <h2>4.8/5</h2>
            <p>Avg. Rating</p>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2>Be the Change!</h2>
          <p>Write a review in just 2 minutes.</p>
          <Link to="/">
            <button className="cta-btn">
              <FaStar /> Write a Review Now
            </button>
          </Link>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            <details>
              <summary>Are reviews anonymous?</summary>
              <p>No, your name is shown to build trust. But we never share contact info.</p>
            </details>
            <details>
              <summary>Can I edit my review?</summary>
              <p>Yes! You can edit or delete your review anytime from your profile.</p>
            </details>
            <details>
              <summary>Do colleges see who wrote the review?</summary>
              <p>Yes, but only admin can see. Students see only name and review.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewImportance;