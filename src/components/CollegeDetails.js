import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useColleges } from '../App';
import { FaStar, FaRegStar } from 'react-icons/fa';


function CollegeDetails() {
  const { id } = useParams();
  const { colleges,addReview } = useColleges();
  // const college = colleges.find(c => c.id === parseInt(id));
  const college = colleges.find(c => c._id === id);

  // USER RATING STATE
  const [userRating, setUserRating] = useState(0)
 
const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  if (!college) return <div style={{ textAlign: 'center', padding: '50px' }}>College not found</div>;

  // const renderStars = (rating) => {
  //   return (
  //     <div style={{ color: '#c9df02ff', fontSize: '1.5rem' }}>
  //       {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
  //     </div>
  //   );
  // };
  const renderStars = (rate, interactive = false, onSet = null) => {
  return (
    <div style={{ fontSize: interactive ? '2rem' : '1.5rem', display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            color: star <= rate ? '#f39c12' : '#ccc',
            transition: 'color 0.2s'
          }}
          onClick={() => interactive && onSet && onSet(star)}
          onMouseEnter={(e) => {
            if (interactive && !rate) e.target.style.color = '#f39c12';
          }}
          onMouseLeave={(e) => {
            if (interactive && !rate) e.target.style.color = '#ccc';
          }}
        >
         {star <= rate ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};




// HANDLE SUBMIT REVIEW
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) {
      alert('Please fill all fields and give a rating!');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(),
    };

    addReview(id, newReview); // Context में add

    // Reset form
    setName('');
    setComment('');
    setRating(0);
    setShowReviewForm(false);
    alert('Thank you! Your review has been submitted.');
  };






  return (
    <div className="college-details" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <img src={college.image} alt={college.name} style={{
        width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/800x350?text=College+Image+Not+Found';
        }} />
      <h2 style={{ margin: '0 0 10px 0', fontSize: '2.2rem', color: '#2c3e50' }}>{college.name}</h2>

      {/*  */}
      {/* RATING STARS */}
      <div style={{ margin: '10px 0' }}>
        <strong>Rating: </strong>
        {renderStars(college.rating || 0)}
        <span style={{ marginLeft: '10px', fontSize: '1.1rem', color: '#555' }}>
          {college.rating || 0}/5
        </span>
      </div>
      {/*  */}

      {/* USER RATING SECTION */}
      <div style={{
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        margin: '25px 0',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Rate this College</h3>
        <p style={{ margin: '0 0 10px 0', color: '#555' }}>Your feedback helps others!</p>

        <div style={{ fontSize: '2rem' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              style={{
                cursor: 'pointer',
                color: star <= userRating ? '#e8d504ff' : '#ccc',
                transition: 'color 0.2s',
                marginRight: '5px'
              }}
              onClick={() => setUserRating(star)}
              onMouseEnter={(e) => {
                if (!userRating) e.target.style.color = '#e8d504ff';
              }}
              onMouseLeave={(e) => {
                if (!userRating) e.target.style.color = '#ccc';
              }}
            >
              ★
            </span>
          ))}
        </div>

        {userRating > 0 && (
          <p style={{ margin: '10px 0 0 0', color: '#27ae60', fontWeight: 'bold' }}>
            You rated: {userRating} star{userRating > 1 ? 's' : ''}
          </p>
        )}
      </div>




      




{/* Write Review Button */}
      <button
        onClick={() => setShowReviewForm(!showReviewForm)}
        style={{
          background: '#ff6b35', color: 'white', padding: '12px 24px',
          border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
          margin: '15px 0'
        }}
      >
        {showReviewForm ? 'Cancel' : 'Write a Review'}
      </button>

      {/* Review Form */}
      {showReviewForm && (
        <div style={{
          background: '#f8f9fa', padding: '20px', borderRadius: '12px',
          border: '1px solid #dee2e6', margin: '20px 0'
        }}>
          <h3>Submit Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <div style={{ margin: '10px 0' }}>
              <strong>Your Rating: </strong>
              {renderStars(rating, true, setRating)}
            </div>
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows="4"
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <button type="submit" style={{
              background: '#28a745', color: 'white', padding: '10px 20px',
              border: 'none', borderRadius: '6px', fontWeight: 'bold'
            }}>
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div style={{ marginTop: '30px' }}>
        <h3>Student Reviews ({college.reviews?.length || 0})</h3>
        {college.reviews && college.reviews.length > 0 ? (
          college.reviews.map(review => (
            <div key={review.id} style={{
              background: 'white', padding: '15px', margin: '10px 0',
              borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{review.name}</strong>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>{review.date}</span>
              </div>
              {renderStars(review.rating)}
              <p style={{ margin: '8px 0 0 0', color: '#444' }}>{review.comment}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No reviews yet. Be the first!</p>
        )}
      </div>






<div style={{ marginTop: '30px', lineHeight: '1.8' }}>
      <p><strong>Stream:</strong> {college.stream}</p>
      <p><strong>Location:</strong> {college.location}</p>
      <p><strong>Fees:</strong> {college.fees}</p>
      <p><strong>Ranking:</strong> {college.ranking}</p>
      <p><strong>Cutoff:</strong> {college.cutoff}</p>
      <p><strong>Rating:</strong> {college.rating}</p>
      <p><strong>Campus Size:</strong> {college.campusSize}</p>
      <p><strong>Established:</strong> {college.established}</p>
      <p><strong>Students:</strong> {college.students}</p>
      <p><strong>Affiliation:</strong> {college.affiliation}</p>
      <p><strong>Courses:</strong> {college.courses}</p>
      <p><strong>Facilities:</strong> {college.facilities}</p>
      <p><strong>Description:</strong> {college.description}</p>
    </div>
    </div>
  );
}






export default CollegeDetails;