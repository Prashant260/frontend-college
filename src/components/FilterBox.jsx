// src/components/FilterBox.jsx
import React from 'react';
import { useColleges } from '../App';

const FilterBox = () => {
  const { selectedGoal, setSelectedGoal, selectedCity, setSelectedCity, setShowFilterBox } = useColleges();

  const goals = ['Engineering', 'Medical', 'Management', 'Law', 'Commerce', 'Arts', 'Science'];
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

  return (
    <div style={{
      position: 'absolute',
      top: '50px',
      right: 0,
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      width: '300px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      zIndex: 1000
    }}>
      <h4 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Filter by Goal & City</h4>

      {/* Goal */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Goal</label>
        <select
          value={selectedGoal}
          onChange={(e) => {
            setSelectedGoal(e.target.value);
            if (!e.target.value) setSelectedCity('');
          }}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        >
          <option value="">All Goals</option>
          {goals.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {/* City */}
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>City</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedGoal}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        >
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button
        onClick={() => setShowFilterBox(false)}
        style={{
          marginTop: '15px',
          width: '100%',
          padding: '10px',
          background: '#ff6b35',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBox;