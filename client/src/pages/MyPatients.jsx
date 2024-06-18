import React, { useState, useEffect } from 'react';
import { fetchPatients } from '../api';

const MyPatients = ({ token }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients(token).then(setPatients);
  }, [token]);

  return (
    <div className="container">
      <h1>My Patients</h1>
      <ul className="list-group">
        {patients.map((patient) => (
          <li className="list-group-item" key={patient.id}>
            {patient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPatients;
