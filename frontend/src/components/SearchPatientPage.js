import React, { useState } from "react";
import axios from "axios";

const SearchPatientPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      alert("You are not logged in. Please log in first.");
      window.location.href = "/LoginForm"; // redirect to login page
      return;
    }

    try {
    let response = null;

    // First try searching by custom_patient_id
    try {
      response = await axios.get(`http://127.0.0.1:8000/api/fetch-patient-visits/`, {
        params: { custom_patient_id: searchValue },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      response = null; // no match
    }

    // If no results, try searching by mobile
    if (!response || !response.data || response.data.length === 0) {
      try {
        response = await axios.get(`http://127.0.0.1:8000/api/fetch-patient-visits/`, {
          params: { mobile: searchValue },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        response = null;
      }
    }

    // Final check
    if (response && response.data && response.data.length > 0) {
      setVisits(response.data);
      setError("");
    } else {
      setVisits([]);
      setError("Patient not found.");
    }
  } catch (error) {
    console.error("Search error:", error);

      if (error.response && error.response.status === 401) {
        alert("Session expired or unauthorized. Please log in again.");
        window.location.href = "/LoginForm"; // redirect to login
      } else {
        setError("Patient not found or error fetching data.");
        setVisits([]);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Search Patient History</h2>
      <input
        type="text"
        placeholder="Enter Mobile No or Patient ID"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {visits.length > 0 && (
        <div>
          <h3>📋 Visit History</h3>
          {visits.map((visit, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
              <p><strong>Date:</strong> {new Date(visit.appointment_date).toLocaleString()}</p>
              <p><strong>Patient Name:</strong> {visit.patient}</p>
              <p><strong>Patient Id:</strong> {visit.custom_patient_id}</p>
              <p><strong>Doctor:</strong> {visit.doctor_name}</p>
              <p><strong>Notes:</strong> {visit.doctor_notes}</p>

              <button onClick={() => handleEditVisit(visit)} style={{ marginRight: "10px" }}>✏️ Edit</button>
              <button onClick={() => handleAddVisit(visit)}>➕ Add New Visit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function handleAddVisit(data) {
    localStorage.setItem("prefillVisit", JSON.stringify(data));
    window.location.href = `/new-visit/${data.custom_patient_id}`;
  }

  function handleEditVisit(data) {
    localStorage.setItem("editVisit", JSON.stringify(data));
    window.location.href = `/edit-visit/${data.id}`;
  }
};

export default SearchPatientPage;
