import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import PatientForm from './components/PatientForm';
import AppointmentForm from './components/AppointmentForm';
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import NewPatientPage from "./components/NewPatientPage";
import ExistingPatientPage from "./components/ExistingPatientPage";
import PrintablePrescription from "./components/PrintablePrescription";
import PrintablePatientReport from './components/PrintablePatientReport';
import PrintPage from "./components/PrintPage";
import SearchPatientPage from "./components/SearchPatientPage";
import EditVisitPage from "./components/EditVisitPage";
import NewPatientVisit from "./components/NewPatientVisit";




function App() {
  return (
    <Router>
      <nav>
        <Link to="/">HomePage</Link> | 
        <Link to="/DoctorList">Doctors</Link> |
        <Link to="/register">Register Patient</Link> |
        <Link to="/book">Book Appointment</Link>|
        <Link to="/SignupForm">SignupForm</Link> |
        <Link to="/LoginForm">LoginForm</Link> |
        <Link to ="/search-patient">Search Patient</Link> |
        <Link to="/new-patient">New Patient</Link> |
        <Link to="/existing-patient">Existing Patient</Link> |
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DoctorList" element={<DoctorList />} />
        <Route path="/register" element={<PatientForm />} />
        <Route path="/book" element={<AppointmentForm />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/welcome/:username" element={<WelcomePage />} />
        <Route path="/new-patient" element={<NewPatientPage />} />
        <Route path="/existing-patient" element={<ExistingPatientPage />} />
        {/* <Route path="/print" element={<PrintPage  />} /> */}
        <Route path="/report" element={<PrintablePatientReport />} />
         <Route path="/search-patient" element={<SearchPatientPage />} />
        <Route path="/new-visit/:custom_patient_id" element={<NewPatientVisit  />} />
        <Route path="/edit-visit/:visitId" element={<NewPatientVisit  />} />
      </Routes>
    </Router>
  );
}

export default App;
