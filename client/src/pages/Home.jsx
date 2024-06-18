import React, { useState, useEffect } from 'react';
import { fetchPhysicians } from '../api';

const Home = () => {
  const [physicians, setPhysicians] = useState([]);

  useEffect(() => {
    fetchPhysicians().then(setPhysicians);
  }, []);

  return (
    <div className="container">
      <h1>Physicians</h1>
      <ul className="list-group">
        {physicians.map((physician) => (
          <li className="list-group-item" key={physician.id}>
            {physician.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
