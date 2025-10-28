// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CollegeList from './components/CollegeList';
import CollegeDetails from './components/CollegeDetails';
// import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import Footer from './components/Footer';
import ReviewImportance from './components/ReviewImportance';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
 fetch(`${API_URL}/api/colleges`);

const CollegeContext = createContext();
const NewsContext = createContext();

// SAMPLE COLLEGES (Fallback)
const sampleColleges = [
  {
    _id: 'fallback1',
    name: 'IIT Delhi',
    stream: 'Engineering',
    location: 'Delhi',
    fees: '₹2,00,000/year',
    ranking: 1,
    cutoff: 95,
    rating: 5,
    campusSize: '320 acres',
    established: 1961,
    students: 8000,
    affiliation: 'Autonomous',
    courses: 'B.Tech, M.Tech, PhD',
    facilities: 'Hostels, Labs, Library',
    description: 'Premier engineering institute.',
    image: 'https://in.pinterest.com/pin/iit-delhi-wallpaper--276127020897701635/'
  },
  {
    _id: 'fallback2',
    name: 'AIIMS',
    stream: 'Medical',
    location: 'Delhi',
    fees: '₹1,000/year',
    ranking: 1,
    cutoff: 98,
    rating: 4.9,
    campusSize: '200 acres',
    established: 1956,
    students: 5000,
    affiliation: 'Autonomous',
    courses: 'MBBS, MD, Nursing',
    facilities: 'Hospital, Labs',
    description: 'Top medical college.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
  },
  {
    _id: 'fallback3',
    name: 'NLS Bangalore',
    stream: 'Law',
    location: 'Bangalore',
    fees: '₹3,00,000/year',
    ranking: 1,
    cutoff: 90,
    rating: 4.8,
    campusSize: '23 acres',
    established: 1987,
    students: 600,
    affiliation: 'Bar Council of India',
    courses: 'BA LLB, LLM',
    facilities: 'Moot Court, Library',
    description: 'Leading law school.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  }
];


export const CollegeProvider = ({ children }) => {
  const [colleges, setColleges] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅️ Ye add karo
  // App.js के ऊपर (useState के साथ)
  const [searchTerm, setSearchTerm] = useState(''); // Global search
  const [selectedGoal, setSelectedGoal] = useState(''); // Goal dropdown
  const [selectedCity, setSelectedCity] = useState(''); // City dropdown
  // App.js के ऊपर (दूसरे useState के साथ)
  const [showFilterBox, setShowFilterBox] = useState(false);
  // App.js
  const [showMenu, setShowMenu] = useState(false); // यहाँ जोड़ो


  // CollegeProvider के अंदर
  const renderStars = (rating, filledColor = '#f39c12', emptyColor = '#ccc', size = '1.2rem') => {
    return (
      <div style={{ display: 'flex', gap: '2px', fontSize: size }}>
        {Array.from({ length: 5 }, (_, i) => (
          i < rating
            ? <FaStar key={i} style={{ color: filledColor }} />
            : <FaRegStar key={i} style={{ color: emptyColor }} />
        ))}
      </div>
    );
  };






  const addReview = (collegeId, review) => {
    setColleges(prev => prev.map(college =>
      college._id === collegeId
        ? { ...college, reviews: [...(college.reviews || []), review] }
        : college
    ));
  };




  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true); // ⬅️ Start loading
      try {
        const res = await axios.get(`${API_URL}/colleges`);
        setColleges(res.data);
      } catch (error) {
        console.error('Fetch Error:', error.message);
        const saved = localStorage.getItem('colleges');
        setColleges(saved ? JSON.parse(saved) : sampleColleges);
      } finally {
        setLoading(false); // ⬅️ Stop loading
      }
    };
    fetchColleges();
  }, []);




  useEffect(() => {
    localStorage.setItem('colleges', JSON.stringify(colleges));
  }, [colleges]);

  const addCollege = async (collegeData) => {
    try {
      const { id, _id, ...data } = collegeData;
      const res = await axios.post(`${API_URL}/colleges`, data);
      setColleges(prev => [...prev, res.data]);
    } catch (error) {
      console.error('ADD ERROR:', error.response?.data || error.message);
      alert('Failed to add college!');
    }
  };

  const editCollege = async (updatedCollege) => {
    try {
      const id = updatedCollege._id || updatedCollege.id;
      await axios.put(`${API_URL}/colleges/${id}`, updatedCollege);
      setColleges(prev => prev.map(c => c._id === id ? updatedCollege : c));
    } catch (error) {
      console.error('EDIT ERROR:', error.response?.data || error.message);
      alert('Failed to edit college!');
    }
  };

  const deleteCollege = async (id) => {
    if (window.confirm('Delete this college?')) {
      try {
        await axios.delete(`${API_URL}/colleges/${id}`);
        setColleges(prev => prev.filter(c => c._id !== id));
      } catch (error) {
        console.error('DELETE ERROR:', error.response?.data || error.message);
        alert('Failed to delete!');
      }
    }
  };

  return (
    <CollegeContext.Provider value={{
      colleges, addCollege, editCollege, deleteCollege,
      isAdminLoggedIn, setIsAdminLoggedIn, addReview,
      searchTerm, setSearchTerm,           // यहाँ add
      selectedGoal, setSelectedGoal,       // यहाँ add
      selectedCity, setSelectedCity,
      showFilterBox, setShowFilterBox,
      showMenu, setShowMenu
      // 
      , loading, renderStars // ⬅️ Ye bhi provide karo
    }}>
      {children}
    </CollegeContext.Provider>
  );
};

// NEWS PROVIDER
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('news');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "IIT Delhi NIRF Rank 1 Announced!" },
      { id: 2, title: "NEET 2024 Cutoff Released" },
      { id: 3, title: "JEE Main 2024 Result Out" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const addNews = (title) => {
    setNews(prev => [...prev, { id: Date.now(), title }]);
  };

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const editNews = (id, title) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, title } : n));
  };

  return (
    <NewsContext.Provider value={{ news, addNews, deleteNews, editNews }}>
      {children}
    </NewsContext.Provider>
  );
};

// HOOKS
export const useColleges = () => useContext(CollegeContext);
export const useNews = () => useContext(NewsContext);

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  // const [showFilterBox, setShowFilterBox] = useState(false);

  return (
    <CollegeProvider>
      <NewsProvider>
        <Router>
          <div className="app">
            {/* <header>
              <div className="header-top">
                <h1 className="header-logo">College Duniya</h1>
                <div className="header-search-section"> */}
            {/* <select className="header-goal-dropdown">
                    <option>Select Goal & City</option>
                  </select> */}





            {/* 
                  <div className="header-main-search">
                    <input type="text" placeholder="Search for Colleges, Exams, Courses and More.." 
                    value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button
                    onClick={() => {
        // Search functionality
        console.log('Searching for:', searchTerm, selectedGoal, selectedCity);
        // Filter will automatically update CollegeList
      }}>Search</button>
                  </div>
                </div>
                <nav>
                  {/* <span className="header-write-review">
                    Review <span className="header-reward"></span>
                  </span> */}
            {/* <span className="header-write-review">
  <Link 
    to="/review-importance" 
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    Review <span className="header-reward"></span>
  </Link> */}
            {/* </span>
                  <select className="header-explore">
                    <option>Explore</option>
                  </select>
                  <span className="header-menu" onClick={() => setShowMenu(!showMenu)}>
                    Menu
                  </span>

                  {showMenu && (
                    <div className="user-menu-container">
                      <Link to="/login" className="menu-item user-login" onClick={() => setShowMenu(false)}>
                        Login as User
                      </Link>
                      <Link to="/admin" className="menu-item admin-login" onClick={() => setShowMenu(false)}>
                        Login as Admin
                      </Link>
                    </div>
                  )}
                </nav>
              </div> */}

            {/* <div className="course-nav">
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'all'; }}>All Courses</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'engineering'; }}>B.Tech</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'management'; }}>MBA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'mtech'; }}>M.Tech</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'medical'; }}>MBBS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'commerce'; }}>B.Com</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'science'; }}>B.Sc</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'nursing'; }}>B.Sc (Nursing)</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'arts'; }}>BA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bba'; }}>BBA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bca'; }}>BCA</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bams'; }}>BAMS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bhms'; }}>BHMS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'barch'; }}>B.ARCH</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'agri'; }}>BSC (Agriculture)</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'llb'; }}>LLB</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'ballb'; }}>BA LLB</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bped'; }}>BPED</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bed'; }}>BED</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = 'bfa'; }}>BFA</a></li>
                </ul>
              </div> */}
            {/* </header> */}






            <Header />
            <Routes>
              <Route path="/" element={<CollegeList />} />
              <Route path="/college/:id" element={<CollegeDetails />} />
              <Route path="/review-importance" element={<ReviewImportance />} />
            

                {/* <Route path="/" element={<CollegeList />} />
                <Route path="/college/:id" element={<CollegeDetails />} /> */}
                {/* <Route path="/admin" element={<UserLogin />} /> */}
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/login" element={<UserLogin />} />
                {/* <Route path="/review-importance" element={<ReviewImportance />} /> */}

              </Routes>
           
            <Footer />

          </div>
        </Router>
      </NewsProvider>
    </CollegeProvider>
  );
}

export default App;

