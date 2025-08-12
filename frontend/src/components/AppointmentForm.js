import React, { useEffect, useState } from 'react';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: '',
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/patients/')
      .then(res => res.json())
      .then(data => setPatients(data));

    fetch('http://127.0.0.1:8000/doctors/')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/appointments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert('Appointment booked!');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <select name="patient" onChange={handleChange} required>
        <option value="">Select Patient</option>
        {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select name="doctor" onChange={handleChange} required>
        <option value="">Select Doctor</option>
        {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <input type="date" name="date" onChange={handleChange} required />
      <button type="submit">Book</button>
    </form>
  );
};

export default AppointmentForm;
