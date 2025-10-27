
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColleges, useNews } from '../App';

function AdminDashboard() {
  const { colleges, addCollege, editCollege, deleteCollege, setIsAdminLoggedIn, loading } = useColleges();
  const { news, addNews, deleteNews, editNews } = useNews();
  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState({
    name: '',
    stream: '',
    location: '',
    fees: '',
    ranking: '',
    cutoff: '',
    campusSize: '',
    established: '',
    students: '',
    affiliation: '',
    courses: '',
    facilities: '',
    description: '',
    image: '',
    rating: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [newNews, setNewNews] = useState('');
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editNewsText, setEditNewsText] = useState('');

  // ADD COLLEGE - FIXED
  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.name.trim() || !form.stream || !form.location.trim()) {
      alert('❌ Name, Stream, and Location are required fields!');
      return;
    }

    try {
      // Prepare data with proper types
      const collegeData = {
        name: form.name.trim(),
        stream: form.stream,
        location: form.location.trim(),
        fees: form.fees || 'Not specified',
        ranking: form.ranking ? Number(form.ranking) : 0,
        cutoff: form.cutoff ? Number(form.cutoff) : 0,
        campusSize: form.campusSize || 'Not specified',
        established: form.established ? Number(form.established) : 0,
        students: form.students ? Number(form.students) : 0,
        affiliation: form.affiliation || 'Not specified',
        courses: form.courses || 'Not specified',
        facilities: form.facilities || 'Not specified',
        description: form.description || 'No description available',
        image: form.image || 'https://via.placeholder.com/300x180?text=No+Image',
        rating: form.rating ? Number(form.rating) : 0
      };

      console.log('📤 Sending college data:', collegeData);
      await addCollege(collegeData);
      resetForm();
      
    } catch (error) {
      console.error('❌ Error in form submission:', error);
      // Error is already handled in addCollege
    }
  };

  // START EDIT
  const startEdit = (college) => {
    setEditingId(college._id);
    setForm({
      name: college.name || '',
      stream: college.stream || '',
      location: college.location || '',
      fees: college.fees || '',
      ranking: college.ranking?.toString() || '',
      cutoff: college.cutoff?.toString() || '',
      campusSize: college.campusSize || '',
      established: college.established?.toString() || '',
      students: college.students?.toString() || '',
      affiliation: college.affiliation || '',
      courses: college.courses || '',
      facilities: college.facilities || '',
      description: college.description || '',
      image: college.image || '',
      rating: college.rating?.toString() || ''
    });
  };

  // UPDATE COLLEGE - FIXED
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.stream || !form.location.trim()) {
      alert('❌ Name, Stream, and Location are required!');
      return;
    }

    try {
      const updateData = {
        _id: editingId,
        name: form.name.trim(),
        stream: form.stream,
        location: form.location.trim(),
        fees: form.fees,
        ranking: form.ranking ? Number(form.ranking) : 0,
        cutoff: form.cutoff ? Number(form.cutoff) : 0,
        campusSize: form.campusSize,
        established: form.established ? Number(form.established) : 0,
        students: form.students ? Number(form.students) : 0,
        affiliation: form.affiliation,
        courses: form.courses,
        facilities: form.facilities,
        description: form.description,
        image: form.image,
        rating: form.rating ? Number(form.rating) : 0
      };

      console.log('✏️ Updating college:', updateData);
      await editCollege(updateData);
      resetForm();
      setEditingId(null);
      
    } catch (error) {
      console.error('❌ Update error:', error);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      name: '', stream: '', location: '', fees: '', ranking: '', cutoff: '',
      campusSize: '', established: '', students: '', affiliation: '',
      courses: '', facilities: '', description: '', image: '', rating: ''
    });
    setEditingId(null);
  };

  // DELETE COLLEGE
  const handleDelete = async (college) => {
    try {
      await deleteCollege(college._id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // NEWS FUNCTIONS
  const handleAddNews = () => {
    if (newNews.trim()) {
      addNews(newNews);
      setNewNews('');
    }
  };

  const startNewsEdit = (item) => {
    setEditingNewsId(item.id);
    setEditNewsText(item.title);
  };

  const handleSaveEdit = () => {
    if (editNewsText.trim()) {
      editNews(editingNewsId, editNewsText);
      setEditingNewsId(null);
      setEditNewsText('');
    }
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Delete this news?')) {
      deleteNews(id);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading colleges...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'arial', maxWidth: '1200px', margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{fontFamily:'ariel',fontSize:'1.6rem'}}>Admin Dashboard</h2>
        {/* <button
          onClick={() => {
            setIsAdminLoggedIn(false);
            navigate('/admin');
          }}
          style={logoutBtnStyle}
        >
          Logout
        </button>
      </div> */}
      
<button
  onClick={() => {
    setIsAdminLoggedIn(false); // ← यह काम करेगा
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }}
  style={logoutBtnStyle}
>
  Logout
</button>
</div>

      {/* COLLEGE FORM */}
      <div style={sectionStyle}>
        <h3 style={{fontFamily:'ariel',fontSize:'1.4rem', padding:'3px', paddingBottom:'6px'}}>{editingId ? 'Edit College' : 'Add New College'}</h3>
        <form onSubmit={editingId ? handleUpdate : handleAdd} style={formStyle}>
          <input placeholder="College Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={inputStyle} />
          
          <select value={form.stream} onChange={e => setForm({...form, stream: e.target.value})} required style={inputStyle}>
            <option value="">Select Stream *</option>
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
            <option value="Law">Law</option>
            <option value="Management">Management</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
          </select>
          
          <input placeholder="Location *" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required style={inputStyle} />
          <input placeholder="Fees" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Ranking" value={form.ranking} onChange={e => setForm({...form, ranking: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Cutoff %" value={form.cutoff} onChange={e => setForm({...form, cutoff: e.target.value})} style={inputStyle} />
          <input placeholder="Campus Size" value={form.campusSize} onChange={e => setForm({...form, campusSize: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Established Year" value={form.established} onChange={e => setForm({...form, established: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="No. of Students" value={form.students} onChange={e => setForm({...form, students: e.target.value})} style={inputStyle} />
          <input placeholder="Affiliation" value={form.affiliation} onChange={e => setForm({...form, affiliation: e.target.value})} style={inputStyle} />
          <input placeholder="Courses" value={form.courses} onChange={e => setForm({...form, courses: e.target.value})} style={inputStyle} />
          <input placeholder="Facilities" value={form.facilities} onChange={e => setForm({...form, facilities: e.target.value})} style={inputStyle} />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="3" style={{...inputStyle, gridColumn: '1 / -1'}} />
          <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} style={{...inputStyle, gridColumn: '1 / -1'}} />
          <input type="number" min="1" max="5" placeholder="Rating (1-5)" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} style={inputStyle} />

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
            <button type="submit" style={{...btnStyle, background: editingId ? '#28a745' : '#007bff'}}>
              {editingId ? 'Update College' : 'Add College'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{...btnStyle, background: '#6c757d'}}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* COLLEGE LIST */}
      <div style={sectionStyle}>
        <h3 style={{fontFamily:'ariel',fontSize:'1.4rem', padding:'3px', paddingBottom:'6px'}}>All Colleges ({colleges.length})</h3>
        {colleges.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No colleges found. Add your first college!</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {colleges.map(college => (
              <div key={college._id} style={collegeCardStyle}>
                <div style={{ flex: 1 }}>
                  <strong>{college.name}</strong> - {college.stream} - {college.location}
                  <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '5px' }}>
                    Fees: {college.fees} | Ranking: #{college.ranking} | Cutoff: {college.cutoff}%
                    <span style={{ marginLeft: '10px', color: '#f39c12' }}>
                      {'★'.repeat(Math.floor(college.rating || 0))}{'☆'.repeat(5 - Math.floor(college.rating || 0))}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button  onClick={() => startEdit(college)} style={editBtnStyle }>Edit</button>
                  <button onClick={() => handleDelete(college)} style={deleteBtnStyle}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NEWS MANAGEMENT */}
      <div style={{...sectionStyle, background: '#f0f8ff'}}>
        <h3 style={{ color: '#ff6b35', fontFamily:'ariel', fontSize:'1.5rem' }}>📰 News Management</h3>
        <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
          <input 
            type="text"
            placeholder="Enter news headline..."
            value={newNews}
            onChange={(e) => setNewNews(e.target.value)}
            style={{...inputStyle, flex: 1, borderRadius:'10px', color:'black'}}
          />
          <button onClick={handleAddNews} style={{...btnStyle, background: '#28a745'}}>Add News</button>
        </div>

        <div>
          {news.map((item) => (
            <div key={item.id} style={newsItemStyle}>
              {editingNewsId === item.id ? (
                <>
                  <input
                    value={editNewsText}
                    onChange={(e) => setEditNewsText(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  <button onClick={handleSaveEdit} style={{...btnSmall, background: '#007bff', marginLeft: '8px'}}>Save</button>
                  <button onClick={() => setEditingNewsId(null)} style={{...btnSmall, background: '#6c757d', marginLeft: '5px'}}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{item.title}</span>
                  <button onClick={() => startNewsEdit(item)} style={{...btnSmall, background: '#ffc107c5', color: 'black', marginRight:'10px'}}>Edit</button>
                  <button onClick={() => handleDeleteNews(item.id)} style={{...btnSmall, background: '#dc3545', color: 'white'}}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// STYLES
const sectionStyle = {
  background: '#ebf5fed5',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '30px'
};

const formStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const btnStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const btnSmall = {
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '0.85rem',
  cursor: 'pointer'
};

const logoutBtnStyle = {
  padding: '8px 16px',
  background: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const collegeCardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  background: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const editBtnStyle = {
  ...btnSmall,
  background: '#ffc107c5',
  color: 'black',
  borderRadius:'4px'
};

const deleteBtnStyle = {
  ...btnSmall,
  background: '#dc3545',
  color: 'white'
};

const newsItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: 'white',
  marginBottom: '8px',
  borderRadius: '6px',
  borderLeft: '4px solid #ff6b35'
};

export default AdminDashboard;