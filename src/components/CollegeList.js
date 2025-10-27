

import React, { useState, useEffect } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { useColleges } from '../App';
import { useNews } from '../App';
import { FaStar, FaRegStar,
         FaWrench, FaChartBar, FaMoneyBillWave,
         FaPaintBrush, FaStethoscope, FaBalanceScale, FaFlask } from 'react-icons/fa';

function CollegeList() {
  const { colleges ,renderStart} = useColleges();
  const { news } = useNews();
  const { selectedGoal, selectedCity } = useColleges();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStream, setFilterStream] = useState('');

  // WORKING IMAGES (All tested)
  const images = [
    'https://images.unsplash.com/photo-1599634874901-e919c4fe1400?w=800',
    'https://images.unsplash.com/photo-1700989101178-e87b2f45dec7?w=800',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const streamFilterParam = queryParams.get('stream');

// streamFilterParam को 'Engineering', 'Medical', आदि में बदलने के लिए
let currentStreamFilter = '';
if (streamFilterParam && streamFilterParam !== 'all') {
    // URL से प्राप्त स्ट्रीम नाम को साफ करें (उदाहरण: 'engineering' को 'Engineering' में बदलें)
    currentStreamFilter = streamFilterParam.charAt(0).toUpperCase() + streamFilterParam.slice(1);
    
    // B.Tech, MBA आदि के लिए मैपिंग (क्योंकि Header में आपने B.Tech के लिए 'engineering' query भेजी है)
    const reverseStreamMap = {
        'Engineering': 'Engineering',
        'Management': 'Management',
        'Mtech': 'M.Tech', // अगर M.Tech नाम का स्ट्रीम है
        'Medical': 'Medical',
        'Commerce': 'Commerce',
        'Science': 'Science',
        'Nursing': 'B.Sc (Nursing)',
        'Arts': 'Arts',
        'Bba': 'BBA',
        'Bca': 'BCA',
        'Bams': 'BAMS',
        'Bhms': 'BHMS',
        'Barch': 'B.ARCH',
        'Agri': 'BSC (Agriculture)',
        'Llb': 'Law',
        'Ballb': 'Law',
        'Bped': 'BPED',
        'Bed': 'BED',
        'Bfa': 'BFA'
    };
    // स्ट्रीम को कॉलेज ऑब्जेक्ट के 'stream' फ़ील्ड के लिए उपयुक्त नाम में बदलें
    currentStreamFilter = reverseStreamMap[currentStreamFilter] || '';
}


  // HASH CHANGE FOR COURSE NAV
  // useEffect(() => {
  //   const handleHashChange = () => {
  //     const hash = window.location.hash.replace('#', '');
  //     const streamMap = {
  //       'engineering': 'Engineering',
  //       'management': 'Management',
  //       'medical': 'Medical',
  //       'commerce': 'Commerce',
  //       'science': 'Science',
  //       'arts': 'Arts',
  //       'law': 'Law'
  //     };
  //     setFilterStream(streamMap[hash] || '');
  //   };
  //   handleHashChange();
  //   window.addEventListener('hashchange', handleHashChange);
  //   return () => window.removeEventListener('hashchange', handleHashChange);
  // }, []);

  // IMAGE CAROUSEL
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // STREAMS WITH COUNT
  const streams = [
    { name: 'Engineering', icon: <FaWrench />, count: colleges.filter(c => c.stream === 'Engineering').length, subs: 'BE/B.Tech' },
    { name: 'Management', icon: <FaChartBar />, count: colleges.filter(c => c.stream === 'Management').length, subs: 'MBA/PGDM' },
    { name: 'Commerce', icon: <FaMoneyBillWave />, count: colleges.filter(c => c.stream === 'Commerce').length, subs: 'B.Com' },
    { name: 'Arts', icon: <FaPaintBrush />, count: colleges.filter(c => c.stream === 'Arts').length, subs: 'BA' },
    { name: 'Medical', icon: <FaStethoscope />, count: colleges.filter(c => c.stream === 'Medical').length, subs: 'MBBS' },
    { name: 'Law', icon: <FaBalanceScale />, count: colleges.filter(c => c.stream === 'Law').length, subs: 'LLB' },
    { name: 'Science', icon: <FaFlask />, count: colleges.filter(c => c.stream === 'Science').length, subs: 'B.Sc' }
  ];

  // FILTERED COLLEGES
  // const filteredColleges = colleges.filter(c =>
  //   (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     c.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //   // (!filterStream || c.stream === filterStream)
  //   (!selectedGoal || c.stream === selectedGoal) &&
  //   (!selectedCity || c.location.toLowerCase().includes(selectedCity.toLowerCase()))
  
  // );
  const filteredColleges = colleges.filter(c => {
    const matchesSearch = (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // URL Stream Filter लागू करें
    const matchesStream = !currentStreamFilter || (c.stream.toLowerCase().includes(currentStreamFilter.toLowerCase()));
    
    // Header में Goal/City फ़िल्टर लागू करें
    const matchesGoal = !selectedGoal || (c.stream === selectedGoal);
    const matchesCity = !selectedCity || (c.location.toLowerCase().includes(selectedCity.toLowerCase()));

    // यदि URL फ़िल्टर सक्रिय है, तो Header के फ़िल्टर को ओवरराइड करें
    if (currentStreamFilter) {
        return matchesSearch && matchesStream;
    } else {
        return matchesSearch && matchesGoal && matchesCity;
    }
});

  // const handleStreamClick = (stream) => {
  //   setFilterStream(stream);
  //   window.location.hash = stream.toLowerCase();
  // };

  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{
          position: 'relative',
          height: '500px',
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          overflow: 'hidden',
          margin: '20px',
          display:'flex', justifyContent:'center', alignItems:'center'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)'

        }}></div>
        <div style={{ position: 'relative', zIndex: 2, color: 'white',width: '100%',
  maxwidth: '1200px',
  padding: '0 20px', }}>
          <h1 style={{ fontSize: '2.5rem',fontweight: 'bold', marginBottom: '20px', display: 'flex', justifyContent: 'center', }}>
            Find Over 25,000 Colleges in India
          </h1>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', maxWidth:'500px', justifyContent:'center', marginLeft:'auto', marginRight:'auto' }}>
            <input
              type="text"
              placeholder="Search for colleges, exams, courses..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '15px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem'
              }}
            />
            <button style={{
              padding: '15px 30px',
              background: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>Search</button>
          </div>
          <div  style={{display:'flex',
            justifyContent:'center', alignItems:'center'}}
>
          <button style={{
            padding: '12px 25px',
            background: '#149828ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            marginRight: '15px' ,
           
          }}>Need Counselling</button></div>

          {/* MARQUEE */}
          <div style={{
            marginTop: '20px',
            padding: '10px',
            background: 'rgba(231, 101, 32, 0.89)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              animation: 'marquee 20s linear infinite',
              whiteSpace: 'nowrap'
            }}>
              {news.concat(news).map((item, i) => (
                <span key={i} style={{
                  marginRight: '40px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  {item.title}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '0.9rem', display: 'none' }}>
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* STUDY GOAL SECTION */}
      
  <section style={{ padding: '40px 20px', background: '#f8f9fa' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
      Select Your Study Goal
    </h2>

    <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
      {streams.map((stream) => (
       
       <Link
    key={stream.name}
    to={`/?stream=${stream.name.toLowerCase()}`}
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            transition: 'all 0.25s ease',
            position: 'relative',
            overflow: 'hidden',
            textDecoration: 'none',
            color: 'inherit',
            display: 'block'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
            {streams[stream.name]}
          </div>

          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', color: '#2c3e50', fontWeight: '600' }}>
            {stream.name}
          </h3>

          <p style={{ margin: '0 0 4px 0', color: '#007bff', fontWeight: 'bold', fontSize: '0.95rem' }}>
            {stream.count} {stream.count === 1 ? 'College' : 'Colleges'}
          </p>

          <p style={{ margin: 0, fontSize: '0.85rem', color: '#6c757d' }}>
            {stream.subs}
          </p>
          {/* </div> */}
        </Link>
      ))}
    </div>
  </section>

      {/* FILTERS */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '250px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <select
          value={filterStream}
          onChange={e => setFilterStream(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minWidth: '200px' }}
        >
          <option value="">All Streams</option>
          {streams.map(s => (
            <option key={s.name} value={s.name}>{s.name} ({s.count})</option>
          ))}
        </select>
      </div>

      {/* COLLEGE LIST */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {filteredColleges.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <h3>No colleges found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {filteredColleges.map(college => (
              <div
                key={college._id}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  background: 'white'
                }}
              >
                <img
                  src={college.image || 'https://via.placeholder.com/300x180?text=No+Image'}
                  alt={college.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                  }}
                />
                <div style={{ padding: '15px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: getStreamColor(college.stream),
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    marginBottom: '10px'
                  }}>
                    {college.stream}
                  </span>
                  <h3 style={{ margin: '10px 0', fontSize: '1.3rem' }}>{college.name}</h3>
                  <p style={{ color: '#555', margin: '5px 0' }}>Location: {college.location}</p>
                  <p style={{ color: '#555', margin: '5px 0' }}>Fees: {college.fees}</p>
                  {/* <div style={{ margin: '10px 0', color: '#f39c12' }}>
                    {'Star'.repeat(college.rating || 0)}{'Unfilled Star'.repeat(5 - (college.rating || 0))}
                  </div> */}
                  <div style={{ margin: '10px 0', fontSize: '1.2rem', display: 'flex', gap: '2px' }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      i < (college.rating || 0)
                        ? <FaStar key={i} style={{ color: '#f39c12' }} />
                        : <FaRegStar key={i} style={{ color: '#ccc' }} />
                    ))}
                  </div>





                  <Link to={`/college/${college._id}`}>
                    <button style={{
                      width: '100%',
                      padding: '12px',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MARQUEE CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// HELPER: Stream Color
function getStreamColor(stream) {
  const colors = {
    Engineering: '#007bff',
    Medical: '#dc3545',
    Law: '#28a745',
    Management: '#ffc107',
    Commerce: '#17a2b8',
    Arts: '#6f42c1',
    Science: '#fd7e14'
  };
  return colors[stream] || '#6c757d';
}

export default CollegeList;