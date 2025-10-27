
import React from 'react';
import { Link } from 'react-router-dom';
import { useColleges } from '../App';
import FilterBox from './FilterBox';
import { FiMenu, FiSearch } from 'react-icons/fi'; // Icons import

const Header = () => {
  const {
    searchTerm, setSearchTerm,
    showFilterBox, setShowFilterBox,
    selectedGoal, selectedCity,
    showMenu, setShowMenu
  } = useColleges();

  return (
    <>





    


      {/* ====== MAIN NAV (Top) ====== */}
      <header style={{
        background: '#fff',
        padding: '12px 20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div class="header-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          {/* Logo */}
          <Link to="/" class="logo1 "style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#ff6b35',
            textDecoration: 'none'
          }}>
            College Duniya
          </Link>

          <div className="search-filter-container" style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: '600px', gap: '10px' }}>
            {/* Search */}
            <div style={{  position: 'relative', flex:1 }}>
              <input  className="search-input-wrapper" 
                type="text"
                placeholder="Search colleges, courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  position: 'relative', flex: 1
                }}
              />
              <button className="filter-button-wrapper" style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                color: 'black',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                
              }}>
               <FiSearch size={20} />
              </button>
            </div>
          

 
         
            {/* Filter */}
            <div class="goal-city" style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowFilterBox(!showFilterBox)}
                style={{
                  padding: '10px 16px',
                  background: selectedGoal || selectedCity ? '#ff6b35' : '#f0f0f0',
                  color: selectedGoal || selectedCity ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {selectedGoal || selectedCity
                  ? `${selectedGoal || ''} ${selectedCity ? `• ${selectedCity}` : ''}`
                  : 'Goal & City'
                }
              </button>
              {showFilterBox && <FilterBox />}
            </div>
</div>


          {/* Right Menu */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/review-importance" style={{ color: '#ff6b35', fontWeight: 'bold', textDecoration: 'none' }}>
              Review
            </Link>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
              <FiMenu size={20} />
              </button>

              {showMenu && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  minWidth: '160px',
                  zIndex: 100
                }}>
                  <Link to="/login" onClick={() => setShowMenu(false)} style={menuItemStyle}>Login as User</Link>
                  {/* <Link to="/admin" onClick={() => setShowMenu(false)} style={menuItemStyle}>Login as Admin</Link> */}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* ====== SCROLLABLE COURSE NAV (नीचे) ====== */}
      <nav style={{
        background: '#2c3e50',
        padding: '12px 0',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* Hide scrollbar */}
        <style jsx>{`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'inline-flex',
          gap: '24px',
          alignItems: 'center'
        }}>
          {courseLinks.map((course, i) => (
            <Link
              key={i}
              to={course.to}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                padding: '6px 0',
                transition: 'color 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={e => e.target.style.color = '#ff6b35'}
              onMouseLeave={e => e.target.style.color = 'white'}
            >
              {course.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

// Reusable
const menuItemStyle = {
  display: 'block',
  padding: '12px 16px',
  textDecoration: 'none',
  color: '#333',
  borderBottom: '1px solid #eee'
};

// Course Links Array (आसानी से edit कर सकते हो)
const courseLinks = [
  { name: 'All Courses', to: '/?stream=all' },
  { name: 'B.Tech', to: '/?stream=engineering' },
  { name: 'MBA', to: '/?stream=management' },
  { name: 'M.Tech', to: '/?stream=mtech' },
  { name: 'MBBS', to: '/?stream=medical' },
  { name: 'B.Com', to: '/?stream=commerce' },
  { name: 'B.Sc', to: '/?stream=science' },
  { name: 'B.Sc (Nursing)', to: '/?stream=nursing' },
  { name: 'BA', to: '/?stream=arts' },
  { name: 'BBA', to: '/?stream=bba' },
  { name: 'BCA', to: '/?stream=bca' },
  { name: 'BAMS', to: '/?stream=bams' },
  { name: 'BHMS', to: '/?stream=bhms' },
  { name: 'B.ARCH', to: '/?stream=barch' },
  { name: 'BSC (Agri)', to: '/?stream=agri' },
  { name: 'LLB', to: '/?stream=llb' },
  { name: 'BA LLB', to: '/?stream=ballb' },
  { name: 'BPED', to: '/?stream=bped' },
  { name: 'BED', to: '/?stream=bed' },
  { name: 'BFA', to: '/?stream=bfa' }
];

export default Header;

