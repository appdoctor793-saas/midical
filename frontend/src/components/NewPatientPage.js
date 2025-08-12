import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";

const NewPatientPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [localUsername, setLocalUsername] = useState("");
   

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    email: "",
    address: "",
    doctorName: "Dr.",
    appointmentDate: "",
    noteDate: "",
    patientId: "",
    examination: {
      UVA: { OD: "", OS: "" },
      BCVA: { OD: "", OS: "" },
      IOP: { OD: "", OS: "" },
    },
    doctorNotes: "",
    investigation: "",
  });

  
  useEffect(() => {
    const savedUsername = username || localStorage.getItem("username");
    if (savedUsername) {
      setLocalUsername(savedUsername);
    }
    const currentDate = new Date();
    setFormData((prev) => ({
      ...prev,
      noteDate: currentDate.toISOString().slice(0, 16),
      patientId: "PID" + Math.floor(Math.random() * 1000000),
    }));
  }, [username]);


    
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age" && value < 0) return;

    if (name.includes(".")) {
      const [param, eye] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        examination: {
          ...prev.examination,
          [param]: {
            ...prev.examination[param],
            [eye]: value,
          },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      sex: "",
      mobile: "",
      email: "",
      address: "",
      doctorName: "Dr.",
      appointmentDate: "",
      noteDate: new Date().toISOString().slice(0, 16),
      patientId: "PID" + Math.floor(Math.random() * 1000000),
      examination: {
        UVA: { OD: "", OS: "" },
        BCVA: { OD: "", OS: "" },
        IOP: { OD: "", OS: "" },
      },
      doctorNotes: "",
      investigation: "",
    });
  }; 


  useEffect(() => {
    const currentDate = new Date();
    setFormData((prev) => ({
      ...prev,
      noteDate: currentDate.toISOString().slice(0, 16),
      patientId: "PID" + Math.floor(Math.random() * 1000000),
    }));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/LoginForm");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        patient: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        age: formData.age,
        sex: formData.sex,
        doctor_name: formData.doctorName,
        appointment_date: formData.appointmentDate,
        custom_patient_id: formData.patientId,
        UVA_OD: formData.examination.UVA.OD,
        UVA_OS: formData.examination.UVA.OS,
        BCVA_OD: formData.examination.BCVA.OD,
        BCVA_OS: formData.examination.BCVA.OS,
        IOP_OD: formData.examination.IOP.OD,
        IOP_OS: formData.examination.IOP.OS,
        doctor_notes: formData.doctorNotes,
        investigation: formData.investigation,
        note_date: formData.noteDate,       // optional
  };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/newpatients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setShowPopup(true);
      } else {
        const err = await response.text();
        console.error("Failed:", err);
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

const handlePrint = () => {
  console.log("Navigating to report with data:", formData);
  navigate('/report', { state: { formData } });
};


const token = localStorage.getItem("access");
if (!token) {
  alert("You're not logged in. Please log in again.");
  navigate("/LoginForm");
  return;
}





  return (
    <div style={styles.fullscreen}>
      <div style={styles.container}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <h1 style={styles.header}>CHITRA EYE CARE</h1>
        <div style={styles.username}>USER: {localUsername?.toUpperCase()}</div>
        <hr style={styles.divider} />

        <h2 style={styles.heading}>New Patient Registration</h2>
        <form onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div style={styles.formRow}>
            <label>Patient Name:</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required />
            <label>Age:</label>
            <input name="age" type="number" value={formData.age} onChange={handleChange} required />
          </div>

          {/* Row 2 */}
          <div style={styles.formRow}>
            <label>Sex:</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Mobile Number:</label>
            <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required />
          </div>

          {/* Row 3 */}
          <div style={styles.formRow}>
            <label>Email Id:</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="2" />
          </div>

          {/* Row 4 */}
          <div style={styles.formRow}>
            <label>Doctor Name:</label>
            <select name="doctorName" value={formData.doctorName} onChange={handleChange}>
              <option value="Dr.">Dr.</option>
              <option value="Dr. Sharma">Dr. Sharma</option>
              <option value="Dr. Mehta">Dr. Mehta</option>
            </select>
            <label>Appointment Date:</label>
            <input name="appointmentDate" type="datetime-local" value={formData.appointmentDate} onChange={handleChange} required />
          </div>

          {/* Row 5 */}
          <div style={styles.formRow}>
            <label>Note Date:</label>
            <input name="noteDate" type="datetime-local" value={formData.noteDate} readOnly />
            <label>Patient ID:</label>
            <input name="patientId" type="text" value={formData.patientId} readOnly />
          </div>

          {/* On Examination Table */}
<div style={{ marginTop: "2rem" }}>
  <h3 style={styles.subheading}>Examination:</h3>
  <table style={styles.examTable}>
    <thead>
      <tr style={styles.examHeaderRow}>
        <th style={styles.examHeaderCell}>Parameter</th>
        <th style={styles.examHeaderCell}>Right Eye (OD)</th>
        <th style={styles.examHeaderCell}>Left Eye (OS)</th>
      </tr>
      <tr>
        <td colSpan={3} style={styles.thinLine}></td>
      </tr>
    </thead>
    <tbody>
      {["UVA", "BCVA", "IOP"].map((param) => (
        <tr key={param}>
          <td style={styles.tableCell}>{param}</td>
          <td style={styles.tableCell}>
            <input
              name={`${param}.OD`}
              value={formData.examination[param].OD}
              onChange={handleChange}
              style={styles.inputCell}
            />
          </td>
          <td style={styles.tableCell}>
            <input
              name={`${param}.OS`}
              value={formData.examination[param].OS}
              onChange={handleChange}
              style={styles.inputCell}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* Doctor Notes Table */}
          <div style={{ marginTop: "2rem" }}>
           <h3 style={styles.subheading}>Doctor Notes:</h3>
            <textarea name="doctorNotes" value={formData.doctorNotes} onChange={handleChange} rows="15" style={{ width: "100%", borderRadius: "6px", padding: "0.5rem" }} />
          </div>

          {/* Investigation */}
          <div style={{ marginTop: "1rem" }}>
            <h3 style={styles.subheading}>Investigations:</h3>
            <textarea name="investigation" value={formData.investigation} onChange={handleChange} rows="2" style={{ width: "100%", borderRadius: "6px", padding: "0.5rem" }} />
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button type="submit" style={styles.button}>Submit</button>
             <button type="button" onClick={handleReset} style={{ ...styles.button, backgroundColor: "#e67e22" }}>Reset</button>
          </div>
        </form>
        {/* ✅ Popup after submit */}
        {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Data Submitted Successfully</h3>
            <p>Would you like to print the prescription?</p>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handlePrint} style={styles.button}>Print</button>
              <button onClick={() => setShowPopup(false)} style={{ ...styles.button, backgroundColor: "#c0392b", marginLeft: "1rem" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  );
}

// ----------------------------
// ✅ Styles


const styles = {
   // ...existing styles...
examHeaderRow: {
  background: "#f9f9f9",
},
examHeaderCell: {
  fontWeight: "bold",
  textAlign: "center",
  padding: "0.5rem",
  borderBottom: "none",
},
thinLine: {
  height: "2px",
  background: "#333",
  border: "none",
  padding: 0,
  margin: 0,
},
inputCell: {
  width: "90%",
  padding: "0.3rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
},
// ...existing styles...
    




  fullscreen: {
    height: "100vh",
    width: "100vw",
    overflowY: "scroll",
    backgroundColor: "#f6f8fa",
    padding: "2rem",
    boxSizing: "border-box",
  },
  container: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "auto",
    background: "linear-gradient(to bottom, #fefcea, #f1da36)",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    fontFamily: "Georgia, serif",
    letterSpacing: "2px",
  },
  username: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginTop: "10px",
  },
  divider: {
    height: "4px",
    backgroundColor: "#2c3e50",
    margin: "1rem 0",
  },
  heading: {
    textAlign: "center",
    color: "#34495e",
    marginBottom: "1rem",
  },
  subheading: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    color: "#2c3e50",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr 2fr",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  examTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  },
  notesTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  },
  tableCell: {
    padding: "0.5rem",
    border: "1px solid #ccc",
  },
  popupOverlay: {
     position: "fixed", 
     top: 0, left: 0, 
     right: 0, bottom: 0, 
     backgroundColor: "rgba(0, 0, 0, 0.5)", 
     display: "flex", 
     justifyContent: "center", 
     alignItems: "center", 
     zIndex: 1000
     },
  popup: { 
    backgroundColor: "#fff", 
    padding: "2rem", 
    borderRadius: "10px", 
    textAlign: "center", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
 },
    button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },

};




export default NewPatientPage;