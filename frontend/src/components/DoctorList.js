import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/doctors/')
      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => {
        console.error("API error: ", err);
      });
  }, []);

  return (
    <div>
      <h1><center>Chitra Eye Care</center></h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.name} - {doctor.specialization}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
