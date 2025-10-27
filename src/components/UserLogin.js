import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useColleges } from '../App';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const savedUser = JSON.parse(localStorage.getItem('user'));
  //   if (savedUser && savedUser.username === username && savedUser.password === password) {
  //     localStorage.setItem('isLoggedIn', 'true');
  //     alert('Logged in successfully!');
  //     navigate('/');
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

const { setIsAdminLoggedIn } = useColleges();


const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      
      console.log('Saved User:', res.data.user);


      if (res.data.user.role === 'admin') {
        setIsAdminLoggedIn(true); // ← यह जोड़ो!
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.msg || 'Invalid credentials');
    }
  };




  return (
    <div className="login-form" style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'50px', }}>
      <h2 style={{fontFamily:'ariel', fontWeight:'bold', fontSize:'1.7rem'}}>User Login</h2>
      <form onSubmit={handleLogin}>
       <div style={{display:'flex',flexDirection:'column', justifyContent:'center', marginTop:'30px',}}>
        <input  style={{ padding:'7px 20px',borderRadius:'5px', backgroundColor:'white', color:'black',fontSize:'1rem'}} type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input  style={{ padding:'7px 20px',marginTop:'5px', borderRadius:'5px', backgroundColor:'white', color:'black',fontSize:'1rem'}} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button  style={{padding:'7px 20px', backgroundColor:'#f16b11eb', border:'none', borderRadius:'4px',
          color:'white',  cursor:'pointer', marginTop:'20px', marginBottom:'20px'}} type="submit" className="admin-submit-btn">Login</button>
        </div>
      </form>
      <p>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default UserLogin;