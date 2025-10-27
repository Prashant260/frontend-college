import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function UserRegister() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 const [role, setRole] = useState('user'); // ← नया
  const navigate = useNavigate();
 
// const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// 

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem('user', JSON.stringify({ username, email, password }));
  //   alert('Registered successfully! Now login.');
  //   navigate('/login');
  // };

const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { name, email, password, role }
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Registered successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }} className="register-form">
      <h2>User Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
        />
        {/* ← ROLE SELECT BOX */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '270px' }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
<button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#f16b11eb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default UserRegister;